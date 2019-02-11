import React from 'react';

const Help = () => {
    return (  
        <div className="help-content">
            <ul className="instructions">
                <li>1. The game is played on a grid that's 3 squares by 3 squares.</li>
                <li>2. You are "O", "X". Players take turns putting their marks in empty squares.</li>
                <li>3. The first player to get 3 of her marks in a row (up, down, across, or diagonally) is the winner.</li>             
            </ul>
        </div>
    );
}
 
export default Help;