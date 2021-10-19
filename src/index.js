import React, {useState} from 'react';
import ReactDOM from 'react-dom';

function Hole(props)
{
  return (
    <button id={props.id} onClick={props.onClick} >
      {props.owner}
    </button>
  );
}

class GameBoard extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      gameBoard: new Array(6).fill(new Array(7).fill('Empty')),
      winner: '',
      playersTurn: 'Red',

    }
  }

  renderHole(posX, posY)
  {
    return (
      <Hole id={'X' + posX + 'Y' + posY} owner={this.state.gameBoard[posY][posX]} onClick={() => 
                                           {
                                             if(this.state.gameBoard[posY][posX] === 'Empty') {
                                                const newBoard = this.state.gameBoard.map((arr) => {
                                                  return arr.slice();
                                                });

                                                let newVal = newBoard[posY];

                                                newVal[posX] = this.state.playersTurn;
                                                

                                                this.setState({
                                                  playersTurn: (this.state.playersTurn === 'Red') ? 'Yellow' : 'Red',
                                                  gameBoard: newBoard
                                                });
                                              }
                                            }
                                        }/>
    );
  }

  renderRow(posY)
  {
    return (
      <div>
        {this.renderHole(0, posY)}
        {this.renderHole(1, posY)}
        {this.renderHole(2, posY)}
        {this.renderHole(3, posY)}
        {this.renderHole(4, posY)}
        {this.renderHole(5, posY)}
        {this.renderHole(6, posY)}
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

  componentDidUpdate()
  {
    if(checkWinner(this.state.gameBoard))
    {
      let win = (this.state.playersTurn === 'Red') ? 'Yellow' : 'Red';
    }
  }
}

function checkFour(a, b, c, d)
{
  return (
          (a !== 'Empty' && b !== 'Empty' && c !== 'Empty' && d !== 'Empty') 
          && 
          (a === b && b === c && c === d)
    );
}

function checkWinner(b)
{
  for (var j = 0; j < 6; j++)
  {
    for(var i = 0; i < 4; i++) 
    {
      if (checkFour(b[j][0 + i], b[j][1 + i], b[j][2 + i], b[j][3 + i]))
      {
        return true;
      }
    }
  }

  for (var j = 0; j < 7; j++)
  {
    for(var i = 0; i < 3; i++) 
    {
      if (checkFour(b[0 + i][j], b[1 + i][j], b[2 + i][j], b[3 + i][j]))
      {
        return true;
      }
    }
  }

  return false;
}

ReactDOM.render(
  <GameBoard />
  ,
  document.getElementById('root')
);

