import React, { useEffect } from 'react';

import firebase from "../api/firebase";
import withFirebaseAuth from "react-with-firebase-auth";

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import MainPage from './MainPage.component';
import Settings from './Settings.component';

import NavBar from './NavBar.component';
import { Container } from '@material-ui/core';

import config from '../firebaseConfig';

const firebaseAppAuth = firebase.auth();
const providers = {
    googleProvider: new firebase.auth.GoogleAuthProvider()
};



class App extends React.Component {

    render () {

        const {
            user,
            signOut,
            signInWithGoogle,
        } = this.props;

        return(
            <Router>
                <div style={{display:'flex'}}>

                    <NavBar />
                    <main style={{flexGrow:1}}>
                        {
                        user ? 

                        <Container>
                            <Route path="/" exact component={MainPage} />
                            <Route path="/settings" component={Settings}/>
                        </Container>

                        :

                        <p>Please sign in</p>
                        }
                        {
                            user
                                ? <button onClick={signOut}>Sign out</button>
                                : <button onClick={signInWithGoogle}>Sign in</button>
                        }      
                    </main>

                </div>
            </Router>
        );
    }
}

export default withFirebaseAuth({
    providers, 
    firebaseAppAuth
}) (App);