import React from 'react';
import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import aws_exports from '../aws-exports';

import Player from './Player.component';
import Uploader from './Uploader.component';


Amplify.configure({...aws_exports, Analytics: {disabled:true}});


class App extends React.Component {

    render () {
        return(
            <div>
                <h1>Audiobook Player</h1>
                <Uploader />
                <Player bookId="fdg234" bookTitle="Taco Man Saves The Day" />
            </div>
        );
    }
}

export default withAuthenticator(App, {includeGreetings: true});