import React, { Component } from 'react';

import GridItem from './components/grid_item';
import './App.css';

class App extends Component {  
  constructor (props) {
    super(props)
    this.state = {
      boardSize: 3,
      playerOneTurn: true,
      isWinner: false,
      gameMoves: [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ],
      playerOneScore: 0,
      playerTwoScore: 0
    }
  }

    //sum the selected cells -if sum is equal 3 player one wins -if sum === 6 player 2 wins
    sum = (cell1, cell2, cell3) => {
      return cell1 + cell2 + cell3;
    }

    // check if someone wins the game
    isWinner = () => {
      const { gameMoves, boardSize, playerOneTurn } = this.state;
      for (let r = 0; r < boardSize; r++) {
        const sum = this.sum(gameMoves[r][0], gameMoves[r][1], gameMoves[r][2])
        console.warn(sum);
        if (sum === 3 || sum === 6) {
          return sum;
        }
      }
      return 0;
    }


    // Sets the figure for the current player and set the next turn
    handlePlayerMove = (event,coordx,coordy) => { 
      let playerOneTurn = this.state.playerOneTurn;
      let move = playerOneTurn === true ? 1 : 2;

      //assign the 'X' or 'O' on the clicked cell
      let figure = playerOneTurn === true ? 'figure-o' : 'figure-x';
      event.target.className = 'grid-item disable';
      event.target.children[0].className = `${figure} animated flash`;

      //update the gameboard move
      let newMove = JSON.parse(JSON.stringify(this.state.gameMoves));
      newMove[coordx][coordy] = move;

      this.setState({
        playerOneTurn: !playerOneTurn,
        gameMoves: newMove
      })
    }

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
              coordx={r} // helps to update the move on the game board
              coordy={i}
              key={ `${r}${i}`}
              handlePlayerMove={ this.handlePlayerMove }
              figure=""/>
            );
        };
        rowItems.push(<div key={r} className="row">{items}</div>);
      };
      return rowItems;
    }

    render() {
      let winnerMessage;
      let hasWinner = this.isWinner();

      if (hasWinner) {
        winnerMessage = <h1>HAS GANADO</h1>;
      } else {
        winnerMessage = null;
      }

    return (
      <React.Fragment>
        
        { winnerMessage }

        <div className="help">
          <p className="help-icon">?</p>
        </div>

        <h1 className="game-title text-center">TIC TAC TOE</h1>
        <div className="turn text-center">TURN: PLAYER 1</div>
        
        {/* Game grid */}
        <div className="container">
          <div className="game-grid text-center">
            { this.drawItems(this.state.boardSize) }
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
