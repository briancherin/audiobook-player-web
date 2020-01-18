import firebase from "../api/firebase";
import "firebase/auth";


export async function getCurrentUserId() {

    return new Promise(function(resolve, reject) {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) { //User is signed in
                resolve(user.uid);
            }
        });
    });

}