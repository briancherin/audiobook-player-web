import React from 'react';

import { Link } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ResponsiveDrawer from './ResponsiveDrawer.component';

export default class NavBar extends React.Component {


    render() {
        return(
            <ResponsiveDrawer>
                <List>
                    <ListItem button component={Link} to="/">
                        <ListItemText>My Library</ListItemText>
                    </ListItem>
                    <ListItem button component={Link} to="/settings/"> 
                        <ListItemText>Settings</ListItemText>
                    </ListItem>
                </List>
            </ResponsiveDrawer>
            
        );
    }
}