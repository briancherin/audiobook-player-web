import React from 'react';

import BookList from './BookList.component';

export default class MainPage extends React.Component {

    state = {
        selectedBook: '',
        selectedBookFile: null,
        selectedBookStream: null
    }

    handleBookSelect = async (bookKey) => {
        // const bookStream = getBookStream(bookKey)
        // this.setState({selectedBookStream: bookStream})
    }


    render() {
        return(
            <div>
                <h1>My Library</h1>
                <BookList onSelectBook={this.handleBookSelect}/>
            </div>
        );
    }
}