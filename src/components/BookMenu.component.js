import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { Menu, MenuItem } from '@material-ui/core';


export default function BookMenu(props) {

    const [menuAnchorElement, setMenuAnchorElement] = React.useState(null);


    const book = props.book;
    const bookKey = book.id;

    
    const handleMenuClick = (event) => {
        setMenuAnchorElement(event.currentTarget);
    }

    const handleMenuClose = () => {
        setMenuAnchorElement(null);
    }

    const askBookDelete = () => {
        setMenuAnchorElement(null);
        props.askBookDelete(book);
    }

    return (
        <ListItemSecondaryAction>
            <IconButton 
                aria-controls={`menu-${bookKey}`} 
                aria-haspopup="true" onClick={handleMenuClick} 
                edge="end" style={{marginLeft:'auto'}}
            >
                <MoreVertIcon />
            </IconButton>

            <Menu 
                id={`menu-${bookKey}`} 
                anchorEl={menuAnchorElement} 
                onClose={handleMenuClose}
                open={Boolean(menuAnchorElement)}
            >
                <MenuItem onClick={askBookDelete}>Remove from library</MenuItem>
            </Menu>
        </ListItemSecondaryAction>
    );
}