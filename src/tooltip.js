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
      custStyle: PropTypes.object,

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
  }

  componentWillReceiveProps(nextProps) {
    const { place, content, children } = nextProps;
    const origin = originOrEl(nextProps);

    if (origin &&
        // add check to see if position has changed.
        // Note: Object.keys is so that we don't fire isSamePosition check on initial state
        (
          (Object.keys(this.state).length && !this.isSamePosition(origin)) ||
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
    });
  }

  isSamePosition(origin) {
    // compares the position of origin to state and returns appropriately
    return (
      origin.offsetLeft === this.state.offset.left &&
      origin.offsetTop === this.state.offset.top &&
      origin.offsetHeight === this.state.offset.height &&
      origin.offsetWidth === this.state.offset.width
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
    // need to define customStyle and customBorder to deal with nested style objects
    const customStyle = this.props.custStyle ? this.props.custStyle : {};
    const customBorder = customStyle.border ? customStyle.border : {};
    const { show, onHover, onLeave } = this.props;
    const origin = originOrEl(this.props);
    const { place, offset } = this.state;
    const content = this.children();
    const visibility = (origin && show) ? 'visible' : 'hidden';
    const style = {
      // NOTE:  theme styles applied in 'styles.js'
      base: { ...styles.base, visibility, ...offset, ...customStyle.base },
      content: { ...styles.content, ...customStyle.content  },
      arrow: { ...styles.arrow, ...customStyle.arrow },

      border: { ...styles.border.base,  ...styles.border[place], ...customBorder[place] }
    };
    style.shadow = { ...styles.content, visibility: 'hidden', position: 'absolute' };

    //console.log('Border Style', place, style.border);

    return (
      <div>
        <div
            ref="tooltip"
            className="theTooltip"
            style={style.base}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
        >
          <div className="ttContent" ref="content" style={style.content}>
            {content}
          </div>
          <div className="arrow" style={style.arrow} key={`a-${place}`}>
            <span className="border" ref="border" style={{...style.border}} key={`b-${place}`}></span>
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
