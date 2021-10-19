import React, {useState} from 'react';
import ReactDOM from 'react-dom';
class Hole extends React.Component{
  render()
  {
    return (
      <button onClick={this.props.onClick}>
        {this.props.owner}
      </button>
    );
  }
}
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
      <Hole /*ID HERE*/ owner={this.state.board[posY][posX]} onClick={() => 
                                           {
                                             if( this.state.board[posX][posY] === 'Empty') {
                                                let newVal = this.state.board;
                                                console.log(this.state.board);
                                                console.log(this.state.board[0]);
                                                console.log(this.state.board[0][0]);
                                                (newVal[posY])[posX] = this.state.playersTurn;
                                                this.setState({'board': newVal});
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
    )
  }
  render() 
  {
    return (
      <div>
        <div>{this.state.playersTurn} Players Turn</div>
        {this.renderRow(5)}
        {this.renderRow(4)}
        {this.renderRow(3)}
        {this.renderRow(2)}
        {this.renderRow(1)}
        {this.renderRow(0)}
      </div>
    );
  }
}

ReactDOM.render(
  <div>
    <GameBoard />
  </div>
  ,
  document.getElementById('root')
);

