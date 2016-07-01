import * as themes from './themes';

export const base = {
  padding: 0,
  fontSize: 0,
  lineHeight: 0,
  position: 'absolute',
  left: 0,
  top: 0,
  zIndex: 9999,
  width: 'auto',
  overflow: 'visible'
};

export const content = {
  overflow: 'hidden'
};

export const arrow = {
  display: 'block',
  textAlign: 'center',
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: -1
};

const vertical = {
  left: 0,
  right: 0,
  margin: '0 auto'
};

const horizontal = {
  top: '50%',
  marginTop: '-8px'
};

export const border = {
  base: {
    ...themes.simple.border,
    display: 'block',
    width: 0,
    height: 0,
    position: 'absolute',
    borderStyle: 'solid'
  },
  top: {
    borderColor: themes.simple.border.borderColor + 'transparent transparent transparent',
    borderWidth: '9px 9px 0px 9px',
    bottom: '-7px',
    ...vertical
  },
  right: {
    borderColor: 'transparent white transparent transparent',
    borderWidth: '9px 9px 9px 0px',
    left: '-7px',
    ...horizontal
  },
  bottom: {
    borderColor: 'transparent transparent ' + themes.simple.border.borderColor +' transparent',
    borderWidth: '0px 9px 9px 9px',
    top: '-7px',
    ...vertical
  },
  left: {
    borderColor: 'transparent transparent transparent white',
    borderWidth: '9px 0px 9px 9px',
    right: '-7px',
    ...horizontal
  }
};


// export const border = {
//   base: {
//     display: 'block',
//     width: 0,
//     height: 0,
//     position: 'absolute'
//   },
//   top: {
//     borderLeft: '9px solid transparent !important',
//     borderRight: '9px solid transparent !important',
//     borderTop: '9px solid',
//     bottom: '-7px',
//     ...vertical
//   },
//   right: {
//     borderTop: '9px solid transparent !important',
//     borderBottom: '9px solid transparent !important',
//     borderRight: '9px solid',
//     left: '-7px',
//     ...horizontal
//   },
//   bottom: {
//     borderBottom: '9px solid',
//     borderLeft: '9px solid transparent !important',
//     borderRight: '9px solid transparent !important',
//
//     top: '-7px',
//     ...vertical
//   },
//   left: {
//     borderTop: '9px solid transparent !important',
//     borderBottom: '9px solid transparent !important',
//     borderLeft: '9px solid',
//     right: '-7px',
//     ...horizontal
//   }
// };
