import React from 'react';

class Player extends React.Component {


    render() {
        return(
            <div>
                <p>Now playing: {this.props.bookTitle}</p>
                <audio controls>
                    <source src = "" type = "audio/mpeg" />
                </audio>
            </div>
        );
    }
}

export default Player;