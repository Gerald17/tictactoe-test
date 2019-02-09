import React, { Component } from 'react';

import GridItem from './components/grid_item';
import './App.css';

class App extends Component {

      // Create items dynamically to generate NxN board sizes
    drawItems(blocks){
      let rowItems = []
      // Create rows
      for (let r = 0; r < blocks; r++) {        
        // Create items
        let items = []
        for (let i = 0; i < blocks; i++) {
          items.push(<GridItem figure="figure-o"/>)
        }
        rowItems.push(<div className="row">{items}</div>)
      }
      return rowItems
    }

    render() {
    const blocks = 3;    

    return (
      <div>

        <h1 className="game-title text-center">TIC TAC TOE</h1>

        {/* Game grid */}
        <div className="game-grid text-center">
          { this.drawItems(blocks) }
          <div className="turn text-center">TURN: PLAYER 1</div>
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
