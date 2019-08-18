import { uploadAudioFile, deleteAudioFile } from '../api/audioStorage';
import { addBookToDatabase, deleteBookFromDatabase, fetchBooks } from './database';
import { getFileExtension } from './fileUtils';

export async function listBooks() {
    return new Promise(async function(resolve, reject) {
        const books = await fetchBooks();
        resolve(books);
        //TODO: catch an error?
    });
}

export async function uploadAudiobook(bookTitle, bookFile) {
    const bookKey = addBookToDatabase(bookTitle);

    const fileExtension = getFileExtension(bookFile);
    const newFileName = bookKey + "." + fileExtension;

    return new Promise(async function(resolve, reject) {
        const res = await uploadAudioFile(newFileName, bookFile);
        resolve(res);
    })

    
}

export async function deleteAudiobook(bookKey) {
    //TODO: need await?
    return new Promise(async function(resolve, reject) {
        await deleteBookFromDatabase(bookKey);
        await deleteAudioFile(bookKey);
        resolve();
    })
    
}