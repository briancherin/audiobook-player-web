import firebase from "../api/firebase";
import "firebase/database";

import {getCurrentUserId} from "../api/firebaseAuthUtils";

var initialized = false;
var booksRef = undefined;

init();

async function init() {
    const currUserId = await getCurrentUserId();
    const databaseRef = firebase.database().ref();
    booksRef = databaseRef.child("booksData").child(currUserId);
    initialized = true;
}

export async function fetchBooks() {

    if (!initialized) {
        await init();
    }

    var bookList = [];
    await booksRef.once('value', function(snapshot) {
        snapshot.forEach((function(childSnapshot) {
            const bookId = childSnapshot.key;
            const bookData = childSnapshot.val();
            const bookObj = {
                id: bookId,
                ...bookData
            }
            bookList.push(bookObj);
        }))
    })

    return bookList;
}

export async function addBookToDatabase(bookTitle, fileExtension) {
    const input = {
        title: bookTitle,
        fileExtension: fileExtension,
        currentPositionMillis: 0
    }

    var newBookRef = await booksRef.push();
    newBookRef.set(input);
    
    return newBookRef.key;  //Return the id of the book added
}

export async function deleteBookFromDatabase(bookKey) {
    await booksRef.child(bookKey).remove();
}