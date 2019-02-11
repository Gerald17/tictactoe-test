import React, { Component } from 'react';

import GridItem from './components/grid_item';
import PlayerInfo from './components/player_info';

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
      playerTwoScore: 0,
      showHelp: false,
      disable: false
    }    
  }
   
    // disable all
    disableAll = () => {
      const disable = document.getElementsByClassName("grid-item");
      if(this.state.disable){    
        for (let i = 0; i < disable.length; i++) {
          disable[i].classList.add("disable");
        }
      }
      return
    }

    //show instructions
    showHelp = () => {
      this.setState({
        showHelp: !this.state.showHelp
      })
    }

    // remove figures
    removeFigures = (figures, resetGame, disable) => {
      while (disable.length) {
        disable[0].classList.remove("disable");
      }
      while (figures.length) {
        figures[0].setAttribute("class", "");
      }
      this.setState({
        playerOneTurn: true,
        gameMoves: resetGame,
        isWinner: false,
        disable: false
      })        
    }

    // restar the current game
    restarGame = () => {      
      const resetGame = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ];      
      const figures = document.getElementsByClassName("shape");
      const disable = document.getElementsByClassName("disable");
      this.removeFigures(figures, resetGame, disable);       
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
      event.target.children[0].className = `shape ${figure} animated flash`;

      //update the gameboard move
      let newMove = JSON.parse(JSON.stringify(this.state.gameMoves));
      newMove[coordx][coordy] = move;
      
      const isWinner = this.isWinner(newMove);

      this.setState({
        playerOneTurn: !playerOneTurn,
        gameMoves: newMove,
        isWinner: isWinner,
        playerOneScore: playerOneTurn && isWinner ? this.state.playerOneScore + 1 : this.state.playerOneScore,
        playerTwoScore: !playerOneTurn  && isWinner ? this.state.playerTwoScore + 1 : this.state.playerTwoScore,
        disable: isWinner ? true : false
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
      if(isWinner){
        this.disableAll()
      }
    return (
      <React.Fragment>
        <div className="overlay"></div>
        <div className="help">
          <p className="help-icon">?</p>
        </div>

        <h1 className="game-title text-center">TIC TAC TOE</h1>
        <div className="turn text-center">TURN: { playerOneTurn ? 'PLAYER 1 ' : 'PLAYER 2 '}</div>
        
        {/* Game grid */}
        <div className="container">
          <div className="game-grid text-center">
            { this.drawItems(this.state.boardSize) }
          </div>      

          {/* players info */}
          
          { isWinner ? <h1 className="winner-message"> PLAYER { playerOneTurn ? "TWO" : "ONE" } WINS</h1> : null }
          <div className="score-board"> 
            <PlayerInfo
              figure="figure-o"
              name="PLAYER ONE"
            />
            <PlayerInfo
              figure="figure-x"
              name="PLAYER TWO"
            />
            <div className="score-container">
              <h5 className="score">{ playerOneScore }</h5>
              <h4 className="player-score">SCORE</h4>
              <h5 className="score">{ playerTwoScore }</h5>
            </div>
          </div>

          <div className="restart" onClick={ this.restarGame }><p>RESTART</p></div>
        </div>


      </React.Fragment>
    );
  }
}

export default App;
