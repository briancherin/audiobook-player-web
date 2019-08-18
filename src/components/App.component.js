import React from 'react';
import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import aws_exports from '../aws-exports';
// import { getBookStream } from '../api/audioStorage';
// import * as audioManager from '../api/audioManager';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import MainPage from './MainPage.component';
import Settings from './Settings.component';

import NavBar from './NavBar.component';
import { Container } from '@material-ui/core';


Amplify.configure({...aws_exports, Analytics: {disabled:true}});


class App extends React.Component {

    render () {
        return(
            <Router>
                <div style={{display:'flex'}}>

                    <NavBar />
                    <main style={{flexGrow:1}}>
                        <Container>
                            <Route path="/" exact component={MainPage} />
                            <Route path="/settings" component={Settings}/>
                        </Container>
                    </main>

                </div>
            </Router>
        );
    }
}

export default withAuthenticator(App, {includeGreetings: true});