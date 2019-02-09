import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      
        <h1>TIC TAC TOE</h1>

        {/* Game grid 3x3 */}
        <div className="game-grid">
          <div className="grid-item">
            <div className="figure o">1</div>
          </div>
          <div className="grid-item">
            <div className="figure x">2</div>
          </div>
          <div className="grid-item">
            <div className="figure o">3</div>
          </div>
        </div>

        {/* players info */}
        <div className="score-board">
          <div className="player-info">
            <div className="player-shape"></div>
            <div className="player-name">Player Name</div>
            <div className="player-score">Score <h4>3</h4></div>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
