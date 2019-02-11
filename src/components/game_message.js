import React from 'react';
const GameMessage = (props) => {
    return ( 
    <div className="win-draw-message">
        <h1 className="winner-message"> { props.message } </h1>
    </div>
    );
}
 
export default GameMessage;