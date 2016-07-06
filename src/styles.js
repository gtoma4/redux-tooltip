import * as themes from './themes';

// set up the name of the theme to apply...
const appliedTheme = 'simple';

export const base = {
  padding: 0,
  fontSize: 0,
  lineHeight: 0,
  position: 'absolute',
  left: 0,
  top: 0,
  zIndex: 9999,
  width: 'auto',
  overflow: 'visible',
  ...themes[appliedTheme].base
};

export const content = {
  overflow: 'hidden',
  ...themes[appliedTheme].content
};

export const arrow = {
  display: 'block',
  textAlign: 'center',
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: -1,
  ...themes[appliedTheme].arrow
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


// the border styling actually sets up the color and position for the arrow
export const border = {
  base: {
    ...themes[appliedTheme].border,
    display: 'block',
    width: 0,
    height: 0,
    position: 'absolute',
    borderStyle: 'solid',
    ...themes[appliedTheme].border.base
  },
  top: {
    borderColor: themes[appliedTheme].border.borderColor + ' transparent transparent transparent',
    borderWidth: '9px 9px 0px 9px',
    bottom: '-7px',
    ...vertical,
    ...themes[appliedTheme].border.top
  },
  right: {
    borderColor: 'transparent ' + themes[appliedTheme].border.borderColor + ' transparent transparent',
    borderWidth: '9px 9px 9px 0px',
    left: '-7px',
    ...horizontal,
    ...themes[appliedTheme].border.right
  },
  bottom: {
    borderColor: 'transparent transparent ' + themes[appliedTheme].border.borderColor +' transparent',
    borderWidth: '0px 9px 9px 9px',
    top: '-7px',
    ...vertical,
    ...themes[appliedTheme].border.bottom
  },
  left: {
    borderColor: 'transparent transparent transparent ' + themes[appliedTheme].border.borderColor,
    borderWidth: '9px 0px 9px 9px',
    right: '-7px',
    ...horizontal,
    ...themes[appliedTheme].border.left
  }
};
