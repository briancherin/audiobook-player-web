import React from 'react';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    fab: {
        top: theme.spacing(2),
        textTransform: 'none'
    }
}))


const UploadButton = (props) => {

    const classes = useStyles();

    function handleClick() {
        props.onClick();
    }

    return(
        <Fab 
            variant="extended" 
            aria-label="upload"
            className={classes.fab}
            onClick={handleClick}
        >
            Upload an audiobook
        </Fab>
    );
}

export default UploadButton;