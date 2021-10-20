import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const boardStyle = {
  backgroundColor: 'blue',
  borderRadius: '5px',
  width: '420px', //Must maintain hole size below

};

const pageStyle = {
  display: 'flex',
  alignItems: 'center', 
  justifyContent: 'space-evenly', 
  flexDirection: 'column',
  height: '100vh'
}


function Hole(props)
{
  const holesStyle = {
    backgroundColor: props.owner,
    height: '50px',
    width: '50px',
    borderRadius: '25px',
    margin: '5px'
  };
  
  return (
    <button style={holesStyle} id={props.id} onClick={props.onClick} >
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
      gameBoard: new Array(6).fill(new Array(7).fill('white')),
      winner: '',
      count: 0,
      playersTurn: 'red', //Game starts with red player 

    }
  }

  renderHole(posX, posY)
  {
    return (
      <Hole  id={'X' + posX + 'Y' + posY} owner={this.state.gameBoard[posY][posX]} onClick={() => 
                                           {
                                              if(this.state.gameBoard[posY][posX] === 'white') {
                                                console.log(this.state.count);
                                                const newBoard = this.state.gameBoard.map((arr) => {
                                                  return arr.slice();
                                                });

                                                let newVal = newBoard[posY];

                                                newVal[posX] = this.state.playersTurn;
                                              

                                                this.setState({
                                                  playersTurn: (this.state.playersTurn === 'red') ? 'yellow' : 'red',
                                                  gameBoard: newBoard,
                                                  count: (this.state.count + 1)
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
      <div style={pageStyle}>
        <div>{this.state.playersTurn} Players Turn</div>
        <div style={boardStyle}>
          {this.renderRow(0)}
          {this.renderRow(1)}
          {this.renderRow(2)}
          {this.renderRow(3)}
          {this.renderRow(4)}
          {this.renderRow(5)}
        </div>
      </div>
    );
  }

  componentDidUpdate()
  {
    let win = checkWinner(this.state.gameBoard);
    console.log(win);  
  }
}

function checkFour(a, b, c, d)
{
  return (
          (a !== 'white' && b !== 'white' && c !== 'white' && d !== 'white') 
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
        return b[j][0 + i];
      }
    }
  }

  for (var j = 0; j < 7; j++)
  {
    for(var i = 0; i < 3; i++) 
    {
      if (checkFour(b[0 + i][j], b[1 + i][j], b[2 + i][j], b[3 + i][j]))
      {
        return b[0 + i][j];
      }
    }
  }

  return '';
}

ReactDOM.render(
  <GameBoard />
  ,
  document.getElementById('root')
);

