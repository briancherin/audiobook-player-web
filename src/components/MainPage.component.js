import React from 'react';

import BookList from './BookList.component';
import { Divider, Typography, Grid } from '@material-ui/core';
import UploadButton from './UploadButton.component';
import UploadDialog from './UploadDialog.component';

export default function MainPage() {

    const [shouldShowUploadDialog, setShouldShowUploadDialog] = React.useState(false);

/*     function handleUploadDialogResponse(response) {

    } */

    //User clicks on "Upload audiobook" button
    function handleUploadButtonClick() {
        showUploadDialog()
    }

    //Show the dialog for uploading a book
    function showUploadDialog() {
        setShouldShowUploadDialog(true);
    }

    //How to close the dialog
    function handleUploadDialogClose() {
        setShouldShowUploadDialog(false);
    }

    function handleBookUploaded() {
        // setShouldShowUploadDialog(false);
    }

    function renderUploadDialog() {
        return(
            <UploadDialog open={shouldShowUploadDialog} onClose={handleUploadDialogClose} onUploadBook={handleBookUploaded}/>
        );
    }

    return(
        <div>
            <Grid container>
                <Grid xs>
                    <h1>My Library</h1>
                </Grid>
                <Grid item>
                    <UploadButton onClick={handleUploadButtonClick}/>
                </Grid>
            </Grid>

            <Divider/>

            <BookList />

            {renderUploadDialog()}
        </div>
    );
}