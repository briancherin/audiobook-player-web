import React from 'react';

import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { ListItemText, Avatar, Typography } from '@material-ui/core';
import DeleteBookDialog from './DeleteBookDialog.component';
import { deleteAudiobook } from '../api/audioManager';
import BookMenu from './BookMenu.component';


function BookList(props) {

    const [deleteAlertOpen, setDeleteAlertOpen] = React.useState(false);
    const [bookToDelete, setBookToDelete] = React.useState('');

    const books = props.books;


    //The user confirms the deletion on the delete modal
    const handleDeleteAlertResponse = (bookObject, shouldDelete) => {
        setDeleteAlertOpen(false);
        setBookToDelete('');

        if (shouldDelete) {
            deleteAudiobook(bookObject)
            .then(() => {
                props.onDeleteBook();
                props.updateFiles();
            })
            .catch((e) => {
                console.log("Error in deleting book", e);
            });
        }
    }

    const handleDeleteAlertClose = () => {
        setDeleteAlertOpen(false);
        setBookToDelete('');
    }

    //Trigger the confirmation alert for deleting a book
    const askBookDelete = (book) => {
        setBookToDelete(book);
        setDeleteAlertOpen(true);
    }

    const renderSavedBooks = () => {
        if (books !== null) {
            if (books.length > 0) {
                return(
                    <List>
                        {books.map(book => {
                            return(
                                <Card key={book.id}>
                                    <ListItem>
                                        {renderBookImage()}
                                        <ListItemText>{book.title}</ListItemText>
                                        {renderBookMenu(book)}
                                    </ListItem>
                                </Card>
                            );
                        })}
                    </List>
                );
            } else {
                return(
                    <Typography>You currently have no audiobooks in your library. Try uploading an mp3 or m4b file!</Typography>
                );
            }
        }
        
    }
    
    const renderBookImage = (bookKey) => {
        return(
            <ListItemAvatar>
                <Avatar alt={bookKey}  src="" style={{borderRadius:0}}/>
            </ListItemAvatar>
        );
    }

    const renderBookMenu = (book) => {
        return(
            <BookMenu book={book} askBookDelete={askBookDelete}/>
        );
    }

    const renderDeleteModal = (book) => {
        return(
            <DeleteBookDialog title="Delete?" open={deleteAlertOpen} bookToDelete={book} onResponse={handleDeleteAlertResponse} handleClose={handleDeleteAlertClose}>
                {/* <Typography> */}
                    Are you sure you would like to delete this audiobook ({book.title})? You will lose access to this audiobook on all of your devices, unless you upload the file again.
                {/* </Typography>     */}
            </DeleteBookDialog>
        );
    }
 

    
    return(
        <div>
            {renderSavedBooks()}   
            {renderDeleteModal(bookToDelete)}    
        </div>
    );
}

export default BookList;