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
    const containerStyle = {
              display: 'flex',
              position: 'relative',
              alignItems: 'center',
              zIndex: '1'
            };

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
          <span onClick={()=>{console.log('clicked');}} style={containerStyle}>
            <span>
              <Origin name="tt2" place="bottom">
                <svg viewBox="0 0 24 24" style={{height: '24px', width: '24px', cursor: 'pointer', fill: 'blue'}}>
                  <title></title>
                  <desc></desc>
                  <path d="M3.0023912,4.8134653 C2.9497201,3.75934179 3.7738493,2.94897589 4.81612837,3.00250649 C4.81612837,3.00250649 10.9450863,3.31180852 11.7342459,3.38502691 C12.5234054,3.4582453 12.9259013,3.42976326 13.3718149,3.87573152 L20.4861289,10.9909168 C20.8306985,11.3355286 21.0019814,11.7723542 20.9999827,12.3014065 C20.997984,12.8304588 20.8164521,13.2755357 20.4553814,13.6366506 L13.6375523,20.4553147 C13.2764817,20.8164296 12.8314592,20.9979838 12.3024717,20.9999827 C11.7734841,21.0019816 11.3367121,20.8306778 10.9921425,20.4860659 L3.87782852,13.3708807 C3.43191487,12.9249124 3.47691328,12.6270077 3.387184,11.7331111 C3.29745472,10.8392144 3.0023912,4.8134653 3.0023912,4.8134653 L3.0023912,4.8134653 Z M9.58690613,6.87260858 C8.83785129,6.123462 7.62339343,6.123462 6.87433859,6.87260858 C6.12528375,7.62175516 6.12528375,8.83636176 6.87433859,9.58550834 C7.62339343,10.3346549 8.83785129,10.3346549 9.58690613,9.58550834 C10.335961,8.83636176 10.335961,7.62175516 9.58690613,6.87260858 L9.58690613,6.87260858 Z M18.1126323,10.6518043 C18.4572019,10.9964162 18.6569301,11.4047929 18.7118228,11.8769469 C18.7667155,12.3491009 18.6523143,12.7270388 18.368616,13.0107719 L13.0117502,18.3682937 C12.7280519,18.6520268 12.3501603,18.7664419 11.8780641,18.7115425 C11.4059679,18.6566431 10.9976412,18.4568905 10.6530715,18.1122786 L18.1126323,10.6518043 L18.1126323,10.6518043 Z">
                  </path>
                </svg>
                <svg viewBox="0 0 24 24" style={{height: '16px', width: '20px', cursor: 'pointer', fill: 'blue', paddingBottom:'3px'}}>
                  <title></title>
                  <desc></desc>
                  <path d="M8.0085302,9.41844124 C6.8992496,9.41844124 6.63076481,10.049206 7.4143185,10.8327597 L11.2881596,14.7066008 C11.6812982,15.0997394 12.3225861,15.0958552 12.7118404,14.7066008 L16.5856815,10.8327597 C17.366788,10.0516532 17.0980496,9.41844124 15.9914698,9.41844124 L8.0085302,9.41844124 L8.0085302,9.41844124 Z">
                  </path>
                </svg>
              </Origin>
            </span>
            <Tooltip name="tt2">problem tooltip #2</Tooltip>
          </span>


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
