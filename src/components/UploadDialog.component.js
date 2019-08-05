import React from 'react';

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

import { putAudioFile } from '../api/audioStorage';

export default function UploadDialog(props) {

    const [selectedFile, setSelectedFile] = React.useState(null);

    function handleClose() {
        props.onClose();
    }

    function uploadFile() {
        props.onClose();
        putAudioFile(selectedFile.name, selectedFile)
        .then((data) => {
            console.log("Successfully uploaded book");
            //TODO: Show progress bar while book is uploading?
            props.onUploadBook();
        })
        .catch(e=> {
            console.log("Error uploading book");
        });
    }

    return(
        <Dialog
            open={props.open}
            onClose={handleClose}
            fullWidth="true"
            maxWidth="sm"
        >
            <DialogTitle>Upload an audiobook</DialogTitle>
            <DialogContent>
                <input
                    type="file"
                    accept=".mp3,.m4b"
                    style={{display: 'none'}}
                    id="input-file"
                    onChange={e => setSelectedFile(e.target.files[0])}
                />
                <label htmlFor="input-file">
                    <Button variant="contained" component="span">
                        Select File
                    </Button>
                </label>
                {selectedFile ? ' ' + selectedFile.name : ''}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={uploadFile}>Upload</Button>
                </DialogActions>
                

        </Dialog>
    );
}