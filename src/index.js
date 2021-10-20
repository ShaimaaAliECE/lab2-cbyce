import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const boardStyle = {
  display: 'flex',
  alignItems: 'center', 
  justifyContent: 'space-evenly', 
  flexDirection: 'column',
  height: '55%'
}

const pageStyle = {
  display: 'flex',
  alignItems: 'center', 
  justifyContent: 'space-evenly', 
  flexDirection: 'column',
  height: '100vh'
}

//Should I just move this to the bottom code or leep it here
function ResetBtn(){
  return (
    <button id={"resetBtn"} onClick={() => 
                      {
                        window.location.reload(false);
                      }
                    }>
      Click To Restart
    </button>
  );
}

function TurnMessage(props) {

  let message;

  if (props.win !== '') {
    message = "Player Wins!";
  } else {
    message = "Players Turn";
  }

  return (
    <div>
      {message}
    </div>
  );
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
    <button style={holesStyle} id={props.id} onClick={props.onClick} ></button>
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
    let holeId = 'X' + posX + 'Y' + posY;
    return (
      //Edit onclick to be better aligned
      <Hole  id={holeId} owner={this.state.gameBoard[posY][posX]} onClick={() => 
                                           {
                                              if(this.state.gameBoard[posY][posX] === 'white' && this.state.winner === '') {
                                                const newBoard = this.state.gameBoard.map((arr) => {
                                                  return arr.slice();
                                                });

                                                let newVal = newBoard[posY];

                                                newVal[posX] = this.state.playersTurn;
                                              

                                                this.setState({
                                                  playersTurn: (this.state.playersTurn === 'red') ? 'yellow' : 'red',
                                                  gameBoard: newBoard,
                                                  count: (this.state.count + 1),
                                                  winner: checkWinner(newBoard)
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
      <div style={boardStyle}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <Hole owner={this.state.playersTurn} id={"displayDot"} /> 
          <TurnMessage win={this.state.winner} />
        </div>
        <div style={{backgroundColor: 'blue', borderRadius: '5px', width: '420px'}}>
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
    //Move around parts so not in did update
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
  <div style={pageStyle}>
    <GameBoard />
    <ResetBtn />
  </div>
  ,
  document.getElementById('root')
);

