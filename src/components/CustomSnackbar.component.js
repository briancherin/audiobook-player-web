import React from 'react';
import { Snackbar, CircularProgress } from '@material-ui/core';

export default function CustomSnackbar(props) {

    function renderAction() {
        if (props.spinner) {
            return(
                <CircularProgress />
            );
        }
    }

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
            }}
            open={props.open}
            autoHideDuration={props.autoHideDuration}
            onClose={props.onClose}
            ContentProps={{
                'aria-describedby': 'snackbar-message',
            }}
            message={<span id="snackbar-message">{props.message}</span>}
            action={[
                renderAction()
            ]}
        />
    );
}  