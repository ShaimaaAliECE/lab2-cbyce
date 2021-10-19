import React, {useState} from 'react';
import ReactDOM from 'react-dom';

function Hole(props)
{
  return (
    <button id={props.id} onClick={props.onClick}>
      {props.owner}
    </button>
  );
}


/* class Row extends React.Component
{
  constructor(props){
    super(props);

    this.state = {
      row: new Array(7).fill('Empty')
    }
  }

  renderHole(posX){}
  render()
  {
    return (
      <div id={this.props.id} onClick={this.props.onClick}>
        <Hole />
      </div>
    );
  }
}
 */

class GameBoard extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      board: new Array(6).fill(new Array(7).fill('Empty')),
      winner: '',
      playersTurn: 'Red',

    }
  }

  renderHole(posX, posY)
  {
    return (
      <Hole id={'X' + posX + 'Y' + posY} owner={this.state.board[posY][posX]} onClick={() => 
                                           {
                                             if(this.state.board[posY][posX] === 'Empty') {
                                                const newBoard = this.state.board.map((arr) => {
                                                  return arr.slice();
                                                });

                                                let newVal = newBoard[posY];

                                                newVal[posX] = this.state.playersTurn;
                                                

                                                this.setState({
                                                  playersTurn: (this.state.playersTurn === 'Red') ? 'Yellow' : 'Red',
                                                  board: newBoard
                                                });
                                              }
                                            }
                                        }/>
    );
  }

  renderRow(ySpot)
  {
    return (
      <div>
        {this.renderHole(0, ySpot)}
        {this.renderHole(1, ySpot)}
        {this.renderHole(2, ySpot)}
        {this.renderHole(3, ySpot)}
        {this.renderHole(4, ySpot)}
        {this.renderHole(5, ySpot)}
        {this.renderHole(6, ySpot)}
      </div>
    );
  }

  render() 
  {
    return (
      <div>
        <div>{this.state.playersTurn} Players Turn</div>
        {this.renderRow(0)}
        {this.renderRow(1)}
        {this.renderRow(2)}
        {this.renderRow(3)}
        {this.renderRow(4)}
        {this.renderRow(5)}
      </div>
    );
  }
}

ReactDOM.render(
  <GameBoard />
  ,
  document.getElementById('root')
);

