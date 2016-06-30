import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { show, hide, delay } from './actions';

class Origin extends Component {
  static get displayName() {
    return 'Origin';
  }

  static get propTypes() {
    return {
      name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
      ]),
      content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.arrayOf(PropTypes.object)
      ]),
      place: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
      ]),
      tagName: PropTypes.string,
      delay: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.number,
        PropTypes.string
      ]),
      delayOn: PropTypes.oneOf(['show', 'hide', 'both']),
      onTimeout: PropTypes.func,
      onMouseEnter: PropTypes.func,
      onMouseLeave: PropTypes.func
    };
  }

  static get defaultProps() {
    return {
      delayOn: 'hide',
      tagName: 'span',
    };
  }

  static wrapBy(tagName) {
    class CustomOrigin extends Origin {
      static get displayName() {
        return `${Origin.displayName}.${tagName}`;
      }

      static get defaultProps() {
        return {
          ...Origin.defaultProps,
          tagName: tagName,
        };
      }
    }

    return connect()(CustomOrigin);
  }

  componentWillUnmount(){
    // hide the tooltip
    this.props.dispatch(hide({ ...this.props }));
  }

  createWithDelay(creator, extras = {}) {
    const { delay: duration, onTimeout: callback } = this.props;
    let action = creator({ ...this.props, ...extras });
    if (duration || callback) {
      action = delay(action, { duration, callback });
    }
    return action;
  }

  render() {
    const props = { ...this.props };
    delete props['dispatch'];

    if (!props.onMouseEnter) {
      props.onMouseEnter = e => {
        // console.log('MouseEnter', this.props);
        // console.log('Origin will be:', e.target);
        // console.log('this.refs?', this.refs);
        // console.log('dataOrigin', e.target.getAttribute('data_origin'));
        // if e.target is origin, (ref=wrapper) then find parent that is...
        let testNode = this.refs.wrapper;

        const action = ['show', 'both'].indexOf(this.props.delayOn) !== -1
          ? this.createWithDelay(show, { origin: testNode })
          : show({ ...this.props, origin: testNode });
        this.props.dispatch(action);
        this.props.onHover && this.props.onHover(e);

        // const action = ['show', 'both'].indexOf(this.props.delayOn) !== -1
        //   ? this.createWithDelay(show, { origin: e.target })
        //   : show({ ...this.props, origin: e.target });
        // this.props.dispatch(action);
        // this.props.onHover && this.props.onHover(e);
      };
    }

    if (!props.onMouseLeave) {
      props.onMouseLeave = e => {
        //console.log('MouseLeave', this.props.name);

        const action = ['hide', 'both'].indexOf(this.props.delayOn) !== -1
          ? this.createWithDelay(hide)
          : hide({ ...this.props });
        this.props.dispatch(action);
        this.props.onLeave && this.props.onLeave(e);
      };
    }

    return React.createElement(this.props.tagName, {
      ...props, ref: 'wrapper'
    });
  }
}

export default connect()(Origin);
