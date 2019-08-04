import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

export default function DeleteBookDialog(props) {


    function handleClose() {
        props.handleClose();
    }

    function handleConfirmClick() {
        props.onResponse(props.bookKey, true)
    }

    return(
        <Dialog
            open={props.open}
            onClose={handleClose}    
        >
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.children}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} selected>Cancel</Button>
                <Button onClick={handleConfirmClick} color='primary'>Confirm</Button>
            </DialogActions>

        </Dialog>
    );
}