import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tooltip, Origin, actions } from '../../src/index';

const SVGOrigin = Origin.wrapBy('g');

class App extends Component {
  constructor(props) {
    super(props);
    // this.handleMove = this.handleMove.bind(this);
    // this.handleLeave = this.handleLeave.bind(this);
  }

  // handleMove(e) {
  //   const origin = { x: e.clientX, y: e.clientY };
  //   this.props.dispatch(actions.show({ origin, content: 'Moving Tooltip!' }));
  // }
  //
  // handleLeave() {
  //   this.props.dispatch(actions.hide());
  // }

  render() {
    return (
      <div>
        <h1>Contained Origin Example</h1>

        <h2>Contained Origin</h2>
        <div style={{display: 'flex', width: '100vw', justifyContent: 'space-around', border: '1px solid black'}}>
          <div>
            <Origin name="tt1" auto={false} >
            <div style={{width:"50px", height:"50px", backgroundColor:"red"}}></div>

            </Origin>
            <Tooltip name="tt1" place="bottom" auto={false}>Tooltip number 1</Tooltip>
          </div>
          <div>
            <div style={{width:"50px", height:"50px", backgroundColor:"blue"}}></div>

          </div>
          <div style={{position:"relative"}}>
            <Origin name="tt3" auto={false}>
            <div style={{width:"50px", height:"50px", backgroundColor:"green"}}></div>
            </Origin>
            <Tooltip name="tt3" place="bottom" auto={false}>Tooltip number 3 - the problem</Tooltip>
          </div>
        </div>
        <h2>Absolutely Positioned</h2>

          <Origin name="tt4" >
            <input  type="input" placeholder="example.com" style={{position:'absolute', right: '0px'}}/>
          </Origin>
          <Tooltip name="tt4" place="bottom" auto={true}>Tooltip number 4 - absolute position problem</Tooltip>


      </div>
    );
  }
}

function select(state) {
  const { app } = state;
  return { app };
}

export default connect(select)(App);
