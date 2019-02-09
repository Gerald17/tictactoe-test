import React, { Component } from 'react';

import GridItem from './components/grid_item';
import './App.css';

class App extends Component {

    // Create items dynamically to generate NxN board sizes
    drawItems = (blocks) => {
      let rowItems = [];
      // Create rows
      for (let r = 0; r < blocks; r++) {        
        // Create items
        let items = [];
        for (let i = 0; i < blocks; i++) {
          items.push(
            <GridItem 
              key={ `${r}${i}`} 
              figure=""/>
            );
        };
        rowItems.push(<div key={r} className="row">{items}</div>);
      };
      return rowItems;
    }

    render() {
    const blocks = 3;    

    return (
      <React.Fragment>

        <div className="help">
          <p className="help-icon">?</p>
        </div>

        <h1 className="game-title text-center">TIC TAC TOE</h1>
        <div className="turn text-center">TURN: PLAYER 1</div>
        
        {/* Game grid */}
        <div className="container">
          <div className="game-grid text-center">
            { this.drawItems(blocks) }
          </div>
          <div className="restart">RESTART</div>
        </div>

        {/* players info */}
        <div className="score-board">
          <div className="player-info">
            <div className="player-shape">
              <GridItem figure="figure-o"/>
            </div>
            <h3 className="player-name">PLAYER 1</h3>
            <h4 className="player-score">SCORE 3</h4>
          </div>
          <div className="player-info">
            <div className="player-shape">
              <GridItem figure="figure-x"/>
            </div>
            <h3 className="player-name">PLAYER 2</h3>
            <h4 className="player-score">SCORE 2</h4>
          </div>
        </div>

      </React.Fragment>
    );
  }
}

export default App;
