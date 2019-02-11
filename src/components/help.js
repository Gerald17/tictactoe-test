import React from 'react';

const Help = () => {
    return (  
        <div className="help-content">
            <ul className="instructions">
                <li>1. The game is played on a grid that's 3 squares by 3 squares.</li>
                <li>2. You are X, your friend (or the computer in this case) is O. Players take turns putting their marks in empty squares.</li>
                <li>3. The first player to get 3 of her marks in a row (up, down, across, or diagonally) is the winner.</li>
                <li>4. When all 9 squares are full, the game is over. If no player has 3 marks in a row, the game ends in a tie.</li>                
            </ul>
        </div>
    );
}
 
export default Help;