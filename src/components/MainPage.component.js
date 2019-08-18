import React, { useEffect } from 'react';

import BookList from './BookList.component';
import { Divider, Typography, Grid } from '@material-ui/core';
import UploadButton from './UploadButton.component';
import UploadDialog from './UploadDialog.component';
import { listBooks } from '../api/audioManager';
import SpinnerSnackbar from './SpinnerSnackbar.component';

export default function MainPage() {

    const [bookOjects, setBookObjects] = React.useState(null);
    const [shouldShowUploadDialog, setShouldShowUploadDialog] = React.useState(false);
    const [shouldShowUploadSpinner, setShouldShowUploadSpinner] = React.useState(false);

/*     function handleUploadDialogResponse(response) {

    } */

    //Hooks equivalent of componentDidMount()
    useEffect(() => {
        updateSavedBooks();
    }, []);

    function updateSavedBooks() {
        listBooks()
        .then((data) => {
            setBookObjects(data);
        })
        .catch(e=> {
            console.log(e);
        });
    }
    

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

    //File is about to be uploaded to backend
    function handleBeginUpload() {
        setShouldShowUploadSpinner(true);
    }

    function handleBookUploaded() {
        updateSavedBooks();
        setShouldShowUploadSpinner(false);
    }

    function renderUploadDialog() {
        return(
            <UploadDialog open={shouldShowUploadDialog} onClose={handleUploadDialogClose} onUploadBook={handleBookUploaded} onBeginUpload={handleBeginUpload}/>
        );
    }

    function renderUploadSpinner() {
        return(
            <SpinnerSnackbar message="Uploading audiobook..." open={shouldShowUploadSpinner} />
        );
    }

    return(
        <div>
            <Grid container>
                <Grid item xs>
                    <h1>My Library</h1>
                </Grid>
                <Grid item>
                    <UploadButton onClick={handleUploadButtonClick}/>
                </Grid>
            </Grid>

            <Divider/>

            <BookList books={bookOjects} updateFiles={updateSavedBooks}/>

            {renderUploadDialog()}
            {renderUploadSpinner()}
        </div>
    );
}