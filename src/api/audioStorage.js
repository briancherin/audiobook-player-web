import * as s3 from './s3';

export async function putAudioFile(fileName, file) {
    if(!s3.initialized) {
        await s3.init();
    }
    await s3.putFile(fileName, file, 'audio/m4b', result => console.log(result), err => console.log(err));
}

export async function deleteBook(fileKey) {
    return new Promise(function(resolve, reject) {
        s3.deleteFile(fileKey).then((err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

export async function fetchSavedBooks() {
    return new Promise(function(resolve, reject) {
        s3.listFileKeys()
        .then((data, err) => {
            if (err) reject(err);
            else resolve(data);
        })
        
    });
}

export async function getBookStream(bookKey) {
    return s3.getFileStream(bookKey);
}

export async function getBookObject(bookKey) {
    return new Promise(function(resolve, reject) {
        s3.getFile(bookKey)
        .then((data, err) => {
            if (err) reject(err);
            else console.log(data);
        })
    })
}