import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { sanitize } from 'dompurify';
import { adjust, resolve, originOrEl } from './utils';
import * as styles from './styles';
import * as themes from './themes';

class Tooltip extends Component {
  static get displayName() {
    return 'Tooltip';
  }

  static get propTypes() {
    return {
      // Props from state tree
      show: PropTypes.bool.isRequired,
      origin: PropTypes.object,
      el: PropTypes.object,
      place: PropTypes.oneOfType([
        PropTypes.string, PropTypes.array
      ]).isRequired,
      content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.arrayOf(PropTypes.object)
      ]),
      auto: PropTypes.bool.isRequired,
      within: PropTypes.func,

      // Props from wrapper props
      name: PropTypes.string,
      onHover: PropTypes.func,
      onLeave: PropTypes.func,
    };
  }

  static get defaultProps() {
    return {
      show: false,
      place: 'top',
      auto: true,
    };
  }

  constructor(props) {
    super(props);
    this.state = {};
    // this.state.offsetLeft = this.props.origin.offsetLeft;
    // this.state.offsetTop = this.props.origin.offsetTop;
    // this.state.offsetWidth = this.props.origin.offsetWidth;
    // this.state.offsetHeight = this.props.origin.offsetHeight;
  }

  componentWillReceiveProps(nextProps) {
    const { place, content, children } = nextProps;
    const origin = originOrEl(nextProps);
    if (origin &&
        ((Object.keys(this.state).length && !this.originSamePosition(origin, this.state)) ||
        originOrEl(this.props) != origin ||
        this.props.place !== place ||
        this.props.content !== content ||
        this.props.children !== children)) {
      this.updatePosition(nextProps);
    }
  }

  updatePosition(props) {
    //console.log('^^^^^^^', props);
    // Render content into hidden DOM element to determine size
    const content = this.children(props);
    ReactDOM.render(<div>{content}</div>, this.refs.shadow, () => {
      const state = adjust(this.refs.shadow, props);
      this.setState(state);
      setTimeout(()=>{console.log('this.state after update', this.state);},0);
    });
  }

  originSamePosition(origin1, statePosition) {
    // compares the position of one origin to another and returns true if
    // they are equal, false if not
    // console.log('origin1.offsetLeft === state.offsetLeft',origin1.offsetLeft, statePosition.offset.left);
    // console.log('origin1.offsetTop === state.offsetTop',origin1.offsetTop, statePosition.offset.top);
    // console.log('origin1.offsetHeight === state.offsetHeight',origin1.offsetHeight, statePosition.offset.height);
    // console.log('origin1.offsetWidth === state.offsetWidth',origin1.offsetWidth, statePosition.offset.width);

    return (
      origin1.offsetLeft === statePosition.offset.left &&
      origin1.offsetTop === statePosition.offset.top &&
      origin1.offsetHeight === statePosition.offset.height &&
      origin1.offsetWidth === statePosition.offset.width
    );
  }

  children(props = this.props) {
    let { content } = props;
    if (typeof content === 'string') {
      content = <div dangerouslySetInnerHTML={{ __html: sanitize(content) }} />;
    }
    return content ? content : props.children;
  }

  render () {
    const { show, onHover, onLeave } = this.props;
    const origin = originOrEl(this.props);
    const { place, offset } = this.state;
    const content = this.children();
    const visibility = (origin && show) ? 'visible' : 'hidden';
    const style = {
      base: { ...styles.base, ...themes.simple.base, visibility, ...offset },
      content: { ...styles.content, ...themes.simple.content },
      arrow: { ...styles.arrow },
      border: { ...styles.border.base, ...styles.border[place], ...themes.simple.border },
    };
    style.shadow = { ...style.content, visibility: 'hidden', position: 'absolute' };

    return (
      <div>
        <div
          ref="tooltip"
          style={style.base}
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
        >
          <div ref="content" style={style.content}>
            {content}
          </div>
          <div style={style.arrow} key={`a-${place}`}>
            <span ref="border" style={style.border} key={`b-${place}`}></span>
          </div>
        </div>
        <div ref="shadow" style={style.shadow} />
      </div>
    );
  }
}

function select(state, ownProps) {
  const { tooltip: tooltips } = state;
  const names = resolve(ownProps);
  if (1 < names.length) {
    console.error(`<Tooltip> does not accept a list of names as 'name' props: ${names}`);
  }
  const name = names[0];
  const tooltip = tooltips[name];
  return { ...tooltip, ...ownProps };
}

export default connect(select)(Tooltip);
