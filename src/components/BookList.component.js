import React from 'react';

import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { ListItemText, Avatar, Menu, MenuItem, Fab, Typography } from '@material-ui/core';
import DeleteBookDialog from './DeleteBookDialog.component';
import { deleteAudiobook } from '../api/audioManager';


function BookList(props) {

    const [menuAnchorElement, setMenuAnchorElement] = React.useState(null);
    const [deleteAlertOpen, setDeleteAlertOpen] = React.useState(false);
    const [bookToDelete, setBookToDelete] = React.useState('');

    const books = props.books;

    const handleMenuClick = (event) => {
        setMenuAnchorElement(event.currentTarget);
    }

    const handleMenuClose = () => {
        setMenuAnchorElement(null);
    }

    //The user confirms the deletion on the delete modal
    const handleDeleteAlertResponse = (bookKey, shouldDelete) => {
        setDeleteAlertOpen(false);
        setBookToDelete('');

        if (shouldDelete) {
            deleteAudiobook(bookKey)
            .then(() => {
                //TODO: Snackbar showing success?
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
        setMenuAnchorElement(null);
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
        const bookKey = book.id;
        return(
            <ListItemSecondaryAction>
                <IconButton 
                    aria-controls={`menu-$(bookKey)`} 
                    aria-haspopup="true" onClick={handleMenuClick} 
                    edge="end" style={{marginLeft:'auto'}}
                >
                    <MoreVertIcon />
                </IconButton>

                <Menu 
                    id={`menu-$(bookKey)`} 
                    anchorEl={menuAnchorElement} 
                    onClose={handleMenuClose}
                    open={Boolean(menuAnchorElement)}
                >
                    <MenuItem onClick={() => askBookDelete(book)}>Remove from library</MenuItem>
                </Menu>
            </ListItemSecondaryAction>
        );
    }

    const renderDeleteModal = (book) => {
        return(
            <DeleteBookDialog title="Delete?" open={deleteAlertOpen} bookKey={book.id} onResponse={handleDeleteAlertResponse} handleClose={handleDeleteAlertClose}>
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