import React, { useEffect } from 'react';
import { fetchSavedBooks, deleteBook } from '../api/audioStorage';

import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { ListItemText, Avatar, Menu, MenuItem, Fab, Typography } from '@material-ui/core';
import DeleteBookDialog from './DeleteBookDialog.component';


function BookList() {

    const [menuAnchorElement, setMenuAnchorElement] = React.useState(null);
    const [fileKeys, setFileKeys] = React.useState([]);
    const [deleteAlertOpen, setDeleteAlertOpen] = React.useState(false);
    const [bookKeyToDelete, setBookKeyToDelete] = React.useState('');

    //Hooks equivalent of componentDidMount()
    useEffect(() => {
        fetchSavedBooks()
        .then((data, err) => {
            if (err) console.log(err);
            else setFileKeys(data);
        });
    }, []);


    const handleMenuClick = (event) => {
        setMenuAnchorElement(event.currentTarget);
    }

    const handleMenuClose = () => {
        setMenuAnchorElement(null);
    }

    const handleDeleteAlertResponse = (bookKey, shouldDelete) => {
        setDeleteAlertOpen(false);
        setBookKeyToDelete('');

        if (shouldDelete) {
            deleteBook(bookKey).then((err, data) => {
                if (err) console.log("Error in deleting book");
                else {
                    //TODO: Snackbar showing success?
                    console.log("Book deleted successfully");
                    setFileKeys(fileKeys.filter(key => key !== bookKey));
                }
            });
        }
    }

    const handleDeleteAlertClose = () => {
        setDeleteAlertOpen(false);
        setBookKeyToDelete('');
    }

    const askBookDelete = (bookKey) => {
        setBookKeyToDelete(bookKey);
        setDeleteAlertOpen(true);
        setMenuAnchorElement(null);
    }

    const renderSavedBooks = () => {
        if (fileKeys.length > 0) {
            return(
                <List>
                    {fileKeys.map(key => {
                        return(
                            <Card key={key}>
                                <ListItem>
                                    {renderBookImage()}
                                    <ListItemText>{key}</ListItemText>
                                    {renderBookMenu(key)}
                                </ListItem>
                            </Card>
                        );
                    })}
                </List>
            );
        }
        return(
            <Typography>You currently have no audiobooks in your library. Try uploading an mp3 or m4b file!</Typography>
        );
    }
    
    const renderBookImage = (bookKey) => {
        return(
            <ListItemAvatar>
                <Avatar alt={bookKey}  src="" style={{borderRadius:0}}/>
            </ListItemAvatar>
        );
    }

    const renderBookMenu = (bookKey) => {
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
                    id={`menu-$(key)`} 
                    anchorEl={menuAnchorElement} 
                    onClose={handleMenuClose}
                    open={Boolean(menuAnchorElement)}
                >
                    <MenuItem onClick={() => askBookDelete(bookKey)}>Remove from library</MenuItem>
                </Menu>
            </ListItemSecondaryAction>
        );
    }

    const renderDeleteModal = (bookKey) => {
        return(
            <DeleteBookDialog title="Delete?" open={deleteAlertOpen} bookKey={bookKey} onResponse={handleDeleteAlertResponse} handleClose={handleDeleteAlertClose}>
                <Typography>
                    Are you sure you would like to delete this audiobook ({bookKey})? You will lose access to this audiobook on all of your devices, unless you upload the file again.
                </Typography>    
            </DeleteBookDialog>
        );
    }
 

    
    return(
        <div>
            {renderSavedBooks()}   
            {renderDeleteModal(bookKeyToDelete)}    
        </div>
    );
}

export default BookList;