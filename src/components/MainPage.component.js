import React, { useEffect } from 'react';

import BookList from './BookList.component';
import { Divider, Typography, Grid } from '@material-ui/core';
import UploadButton from './UploadButton.component';
import UploadDialog from './UploadDialog.component';
import { fetchSavedBooks } from '../api/audioStorage';

export default function MainPage() {

    const [fileKeys, setFileKeys] = React.useState([]);
    const [shouldShowUploadDialog, setShouldShowUploadDialog] = React.useState(false);

/*     function handleUploadDialogResponse(response) {

    } */

    //Hooks equivalent of componentDidMount()
    useEffect(() => {
        updateSavedBooks();
    }, []);

    function updateSavedBooks() {
        fetchSavedBooks()
        .then((data) => {
            setFileKeys(data);
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

    function handleBookUploaded() {
        updateSavedBooks();
    }

    function renderUploadDialog() {
        return(
            <UploadDialog open={shouldShowUploadDialog} onClose={handleUploadDialogClose} onUploadBook={handleBookUploaded} updateFiles={updateSavedBooks}/>
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

            <BookList fileKeys={fileKeys} updateFiles={updateSavedBooks}/>

            {renderUploadDialog()}
        </div>
    );
}