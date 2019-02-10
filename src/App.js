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
   
    // update player score
    updateScore = () => {
      this.setState({
        playerOneScore: this.setState.playerOneScore + 1
      })
    }  

    //sum the selected cells -if sum is equal 3 player one wins -if sum === 6 player 2 wins
    sum = (cell1, cell2, cell3) => {
      if(cell1 === cell2 && cell1 === cell3){ //make sure it has the same figure
        return cell1 + cell2 + cell3;
      }
      return 0;
    }

    // check if someone wins the game
    isWinner = (newMove) => {
      const { boardSize } = this.state;

      // check for rows
      for (let r = 0; r < boardSize; r++) {
        const sum = this.sum(newMove[r][0], newMove[r][1], newMove[r][2])
        if (sum === 3 || sum === 6) {
          return true;
        }
      }

      // check for columns
      for (let r = 0; r < boardSize; r++) {
        const sum = this.sum(newMove[0][r], newMove[1][r], newMove[2][r])
        if (sum === 3 || sum === 6) {
          return true;
        }
      }

      // check for diagonal one
      const diagonalOne = this.sum(newMove[0][0], newMove[1][1], newMove[2][2])
      if (diagonalOne === 3 || diagonalOne === 6) {
        return true;
      }

      // check for diagonal Two
      const diagonalTwo = this.sum(newMove[0][2], newMove[1][1], newMove[2][0])
      if (diagonalTwo === 3 || diagonalTwo === 6) {
        return true;
      }
      return false;
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
      
      const isWinner = this.isWinner(newMove);

      this.setState({
        playerOneTurn: !playerOneTurn,
        gameMoves: newMove,
        isWinner: isWinner,
        playerOneScore: playerOneTurn && isWinner ? this.state.playerOneScore + 1 : this.state.playerOneScore,
        playerTwoScore: !playerOneTurn  && isWinner ? this.state.playerTwoScore + 1 : this.state.playerTwoScore
      });
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
      const { playerOneTurn, playerOneScore, playerTwoScore, isWinner } = this.state;
    return (
      <React.Fragment>

        <div className="help">
          <p className="help-icon">?</p>
        </div>

        <h1 className="game-title text-center">TIC TAC TOE</h1>
        <div className="turn text-center">TURN: { playerOneTurn ? 'Player 1 (O)' : 'Player 2 (X)'}</div>
        
        {/* Game grid */}
        <div className="container">
          <div className="game-grid text-center">
            { this.drawItems(this.state.boardSize) }
          </div>
          <div className="restart">RESTART</div>
        </div>
        

        { isWinner ? <h1 className="winner-message">Ganador</h1> : null }

        {/* players info */}
        <div className="score-board">
          <div className="player-info">
            <div className="player-shape">
              <GridItem figure="figure-o"/>
            </div>
            <h3 className="player-name">PLAYER 1</h3>
            <h4 className="player-score">SCORE { playerOneScore }</h4>
          </div>
          <div className="player-info">
            <div className="player-shape">
              <GridItem figure="figure-x"/>
            </div>
            <h3 className="player-name">PLAYER 2</h3>
            <h4 className="player-score">SCORE { playerTwoScore }</h4>
          </div>
        </div>

      </React.Fragment>
    );
  }
}

export default App;
