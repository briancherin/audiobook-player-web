import React from 'react';
import { putAudioFile } from '../api/audioStorage';

const Uploader = () => {

    const onUpload = (e) => {
        const file = e.target.files[0];
        putAudioFile(file.name, file);
    }

    return(
        <input type="file" accept=".mp3,.m4b" onChange={e => onUpload(e)} />
    );
};

export default Uploader;