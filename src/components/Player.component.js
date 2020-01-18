import React from 'react';

class Player extends React.Component {


    componentDidMount() {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        const context = new AudioContext();
    }

    render() {
        return(
            <div>
                <p>Now playing: {this.props.bookKey}</p>
                <audio controls>
                    <source src = "" type = "audio/mpeg" />
                </audio>
            </div>
        );
    }
}

export default Player;