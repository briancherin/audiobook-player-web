import React from 'react';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    fab: {
        // position: 'absolute',
        top: theme.spacing(2),
        // right: theme.spacing(3),
        textTransform: 'none'
    }
}))


const UploadButton = () => {

    const classes = useStyles();

    return(
        <Fab 
            variant="extended" 
            aria-label="upload"
            className={classes.fab}
        >
            Upload an audiobook
        </Fab>
    );
}

export default UploadButton;