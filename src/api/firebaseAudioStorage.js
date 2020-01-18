import firebase from "../api/firebase";
import "firebase/storage";

import {getCurrentUserId} from "../api/firebaseAuthUtils";

var initialized = false;
var booksStorageRef = undefined;

init();

async function init() {
    const currUserId = await getCurrentUserId();
    var storageRef = firebase.storage().ref();
    booksStorageRef = storageRef.child("books").child(currUserId);
    initialized = true;
}

export async function uploadAudioFile(fileName, file) {
    
    if (!initialized) {
        await init();
    }

    console.log("filename", fileName);

    //TODO: Should be specifying audio/m4b????
    return new Promise(function(resolve, reject) {
        const newFileRef = booksStorageRef.child(fileName);
        
        newFileRef.put(file).then(function(snapshot) {
            resolve(snapshot);
        })
        .catch(function(error) {
            reject(error);
        });
    })
}

export async function deleteAudioFile(bookKey, fileExtension) {

    if (!initialized) {
        await init();
    }

    return new Promise(function(resolve, reject) {
       const fileRef = booksStorageRef.child(bookKey + "." + fileExtension);
       
       fileRef.delete().then(function() {
           resolve(true);
       }).catch(function(error) {
            reject(error);
       });
    });
}

    