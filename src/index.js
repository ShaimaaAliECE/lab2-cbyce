import React, {useState} from 'react';
import ReactDOM from 'react-dom';

/* function BoardCountingButton(props)
{
  const [count, setCount] = useState(0);
  return (
    <button id='props.id' onClick={() => {setCount(count + 1)}}>
      This button was clicked {count} times.
    </button>
  );
} */
class Hole extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = {owner: ''}
  }

  render()
  {
    return (
      <button id={this.props.id} onClick={() => 
                                                {
                                                  if (this.state.owner === '') {
                                                    this.setState({owner: 'You'});
                                                  } 
                                                }
                                          }>
        {this.state.owner}
      </button>
    );
  }

  componentDidMount() 
  {
    //alert("The button was just introduced ==>" + document.getElementById('btn').getBoundingClientRect().top);
  }

  componentDidUpdate()
  {
    //this.props.playersTurn = (this.props.playersTurn === 'Red')? 'Blue' : 'Red';
    //alert("This button has updated")
  }
}
class GameBoard extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      winner: '',
      playersTurn: 'Red',

    }
  }
  render() 
  {
    return (
      <div>
        <Hole />
        <Hole />
        <Hole />
        <Hole />
        <Hole />
        <Hole />
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

