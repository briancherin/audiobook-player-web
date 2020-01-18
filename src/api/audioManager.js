import { uploadAudioFile, deleteAudioFile } from '../api/firebaseAudioStorage';
import { addBookToDatabase, deleteBookFromDatabase, fetchBooks } from './firebaseDatabase';
import { getFileExtension } from './fileUtils';

export async function listBooks() {
    return new Promise(async function(resolve, reject) {
        const books = await fetchBooks();
        resolve(books);
        //TODO: catch an error?
    });
}

export async function uploadAudiobook(bookTitle, bookFile) {
    const fileExtension = getFileExtension(bookFile);

    const bookKey = await addBookToDatabase(bookTitle, fileExtension);

    const newFileName = bookKey + "." + fileExtension;

    return new Promise(async function(resolve, reject) {
        const res = await uploadAudioFile(newFileName, bookFile);
        resolve(res);
    })

    
}

export async function deleteAudiobook(bookObject) {
    //TODO: need await?
    return new Promise(async function(resolve, reject) {
        await deleteBookFromDatabase(bookObject.id);
        await deleteAudioFile(bookObject.id, bookObject.fileExtension);
        resolve();
    })
    
}