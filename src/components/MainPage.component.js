import React from 'react';

import BookList from './BookList.component';
import { Divider, Typography, Grid } from '@material-ui/core';
import UploadButton from './UploadButton.component';

export default class MainPage extends React.Component {



    render() {
        return(
            <div>
                <Grid container>
                    <Grid xs>
                        <h1>My Library</h1>
                    </Grid>
                    <Grid item>
                        <UploadButton />
                    </Grid>
                </Grid>

                <Divider/>

                <BookList />
            </div>
        );
    }
}