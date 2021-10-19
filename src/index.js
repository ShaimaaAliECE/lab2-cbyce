import React, {useState} from 'react';
import ReactDOM from 'react-dom';

function BoardCountingButton(props)
{
  const [count, setCount] = useState(0);
  return (
    <button id='props.id' onClick={() => {setCount(count + 1)}}>
      This button was clicked {count} times.
    </button>
  );
}
class BoardButton extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = {count: 0};
  }
  render() 
  {
    return (
      <button id={this.props.id} onClick={() => this.setState({count: (++this.state.count)})}>
        This button was clicked {this.state.count} times
      </button>
    );
  }

  componentDidMount() 
  {
    //alert("The button was just introduced ==>" + document.getElementById('btn').getBoundingClientRect().top);
  }

  componentDidUpdate()
  {
    //alert("This button has updated")
  }
}

class Slot extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = {'switch': 'OFF'};
  }
  render() 
  {
    return (
      <button id={this.props.id} onClick= {() => 
                                            {
                                              let newState = (this.state.switch === 'OFF')? 'ON' : 'OFF';
                                              this.setState({'switch' : newState});

                                            }
                                          } >
        {this.state.switch}
      </button>
    );
  }
}
class GameBoard extends React.Component
{
  render() 
  {
    return (
      <div>
        <Slot />
        <Slot />
        <Slot />
        <Slot />
      </div>
    );
  }
}

ReactDOM.render(
  <div>
    <GameBoard />
    {/* <BoardCountingButton id='countBtn'/>
    <br/>
    <BoardButton id='btn'/>
    <br/>
    <BoardButton id='btnTwo'/> */}
  </div>
  ,
  document.getElementById('root')
);

