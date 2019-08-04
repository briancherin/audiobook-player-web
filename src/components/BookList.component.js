import React, { useEffect } from 'react';
import { fetchSavedBooks } from '../api/audioStorage';

import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { ListItemText, Avatar, Menu, MenuItem, Fab } from '@material-ui/core';
import TopBar from './TopBar.component';



function BookList(props) {

    const [menuAnchorElement, setMenuAnchorElement] = React.useState(null);
    const [fileKeys, setFileKeys] = React.useState([]);


    //Hooks equivalent of componentDidMount()
    useEffect(() => {
        fetchSavedBooks()
        .then((data, err) => {
            if (err) console.log(err);
            else setFileKeys(data);
        });
    }, []);

    const handleBookClick = (bookKey) => {
        props.onSelectBook(bookKey);
    }

    const handleMenuClick = (event) => {
        setMenuAnchorElement(event.currentTarget);
    }

    const handleMenuClose = () => {
        setMenuAnchorElement(null);
    }

    const renderSavedBooks = () => {
        return(
            <List>
                {fileKeys.map(key => {
                    return(
                        <Card key={key}>
                            <ListItem>
                                {renderBookImage()}
                                <ListItemText>{key}</ListItemText>
                                {renderBookMenu()}
                            </ListItem>
                        </Card>
                    );
                })}
            </List>
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
                    <MenuItem>Remove from library</MenuItem>
                </Menu>
            </ListItemSecondaryAction>
        );
    }


 

    
    return(
        <div>
            {renderSavedBooks()}       
        </div>
    );
}

export default BookList;