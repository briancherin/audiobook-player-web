import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';

import { makeStyles } from '@material-ui/core/styles';



const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  }
}));


function TopBar(props) {

    const classes = useStyles();


    return(
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <h1 style={{flexGrow:'1', fontWeight:'normal'}}>
                    {props.title}
                </h1>
                {props.children}                
            </Toolbar>
        </AppBar>
    );
}

export default TopBar;
