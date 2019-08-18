import React from 'react';
import { Snackbar, CircularProgress } from '@material-ui/core';

export default function SpinnerSnackbar(props) {

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
            }}
            open={props.open}
            ContentProps={{
                'aria-describedby': 'snackbar-message',
            }}
            message={<span id="snackbar-message">{props.message}</span>}
            action={[
                <CircularProgress />
            ]}
        />
    );
}  