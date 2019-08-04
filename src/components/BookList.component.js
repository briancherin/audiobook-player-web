import React from 'react';
import { fetchSavedBooks } from '../api/audioStorage';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { ListItemText, Avatar, Menu, MenuItem } from '@material-ui/core';

class BookList extends React.Component {

    state = {
        fileKeys: [],
        menuAnchorElement: null
        
    }

    async componentDidMount() {
        fetchSavedBooks()
        .then((data, err) => {
            if (err) console.log(err);
            else this.setState({fileKeys: data });
        });
        
    }

    handleBookClick = (bookKey) => {
        this.props.onSelectBook(bookKey);
    }

    handleMenuClick = (event) => {
        this.setState({menuAnchorElement: event.currentTarget});
    }

    handleMenuClose = () => {
        this.setState({menuAnchorElement: null});
    }

    renderSavedBooks() {
        return(
            <List>
                {this.state.fileKeys.map(key => {
                    return(
                        <Card key={key}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar alt={key}  src="" style={{borderRadius:0}}/>
                                </ListItemAvatar>
                                <ListItemText>{key}</ListItemText>
                                <ListItemSecondaryAction>
                                <IconButton aria-controls={`menu-$(key)`} aria-haspopup="true" onClick={this.handleMenuClick} edge="end" style={{marginLeft:'auto'}}>
                                    <MoreVertIcon />
                                </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>

                            <Menu 
                                id={`menu-$(key)`} 
                                anchorEl={this.state.menuAnchorElement} 
                                onClose={this.handleMenuClose}
                                open={Boolean(this.state.menuAnchorElement)}
                            >
                                <MenuItem>Remove from library</MenuItem>
                            </Menu>

                        </Card>
                    );
                })}
            </List>
        );
    }         

    render() {
        return(
            <div>
                {this.renderSavedBooks()}
            </div>
        );
    }
}

export default BookList;