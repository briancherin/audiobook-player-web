import * as s3 from './s3';

export async function putAudioFile(fileName, file) {
    if(!s3.initialized) {
        await s3.init();
    }
    //TODO: Should be specifying audio/m4b????
    return new Promise(function(resolve, reject) {
        s3.putFile(fileName, file, 'audio/m4b')
        .then(data => {
            resolve(data);
        })
        .catch(err => {
            reject(err);
        });
    })
}

export async function deleteBook(fileKey) {
    return new Promise(function(resolve, reject) {
        s3.deleteFile(fileKey)
        .then(data => {
            resolve(data);
        })
        .catch(err => {
            reject(err);
        });
    });
}

export async function fetchSavedBooks() {
    return new Promise(function(resolve, reject) {
        s3.listFileKeys()
        .then(data => {
            resolve(data);
        })
        .catch(err => {
            reject(err);
        });
        
    });
}

export async function getBookStream(bookKey) {
    return s3.getFileStream(bookKey);
}

export async function getBookObject(bookKey) {
    return new Promise(function(resolve, reject) {
        s3.getFile(bookKey)
        .then(data => {
            resolve(data);
        })
        .catch(err => {
            reject(err);
        });
    })
}