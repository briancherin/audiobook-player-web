import { Storage } from 'aws-amplify';

Storage.configure({ level: 'private'});   //Only logged on user can read and write their own files


export function putAudioFile(fileName, file) {
    putFile(fileName, file, 'audio/m4b', result => console.log(result), err => console.log(err));
}

function putFile(fileName, file, contentType, onSuccess, onFailure) {
    Storage.put(fileName, file, {
        contentType: contentType
    })
    .then(result => onSuccess(result))
    .catch(err => onFailure(err));
}

