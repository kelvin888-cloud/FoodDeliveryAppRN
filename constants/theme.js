import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  //base colors
  primary: '#FC603F', // orange
  secondary: '#CDCDD2', //gray

  black: '#1E1F20',
  purewhite: '#FFFFFF',

  lightGray: '#F5F5F6',
  lightGray2: '#F6F6F7',
  lightGray3: '#EFEFF1',
  lightGray4: '#F8F8F9',
  darkgray: '#898C95',

  backdrop: 'rgba(0, 0, 0, 0.7)',
  background: '#343434',
  coalblack: '#000000',
  blueGradient: ['#26D0CE', '#1A2980'],
  disabledButton: ['#D1D1D1', '#666666'],
  positive: '#15D300',
  success: '#008000',
  errors: '#CC3333',
  infoSecondary: '#296FD6',
  grapefruit: '#239AB5',
  darkblue: '#1769aa',
  lightBlue: '#4dabf5',
  greyGradient: ['#f0f0f0', '#D1D1D1'],
  highlight: '#FFE600',
  inputBackground: '#FFFFFF',
  mediumGray: '#D1D1D1',
  placeholderTextColor: 'rgba(255,255, 255, 0.5)',
  textInput: 'rgba(0, 0, 0, 0.2)',
  backgroundModal: 'rgba(0, 0, 0, 0.6)',
  transparent: 'rgba(0,0,0,0)',
  white: '#ffffff',
  lightGray: '#F5F5F6',
  lightGray2: '#F6F6F7',
  lightGray3: '#EFEFF1',
  lightGray4: '#F8F8F9',
  transparent: 'transparent',
  darkergray: '#898C95',
};

export const SIZES = {
  base: 8,
  font: 14,
  radius: 30,
  padding: 10,
  padding2: 12,

  //font size
  largeTitle: 50,
  h1: 30,
  h2: 22,
  h3: 20,
  h4: 18,
  h5: 16,
  h6: 14,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,
  body5: 12,

  //app dimension
  width,
  height,
};

const zero = 0;
const tiny = 5; // 5
const small = tiny * 2; // 10
const regular = tiny * 3; // 15
const medium = tiny * 4; // 20
const large = regular * 2; // 30
const xlarge = regular * 45; // 30
export const MetricsSizes = {
  zero,
  tiny,
  small,
  regular,
  medium,
  large,
  xlarge,
};

export const FontSize = {
  small: 12,
  regular: 14,
  medium: 16,
  large: 18,
};

export const FONTS = {
  largeTitle: {
    fontFamily: 'Roboto-regular',
    fontSize: SIZES.largeTitle,
    lineHeight: 55,
  },
  h1: {fontFamily: 'Roboto-Black', fontSize: SIZES.h1, lineHeight: 36},
  h2: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h2, lineHeight: 30},
  h3: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h3, lineHeight: 22},
  h4: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h4, lineHeight: 22},
  body1: {fontFamily: 'Roboto-Regular', fontSize: SIZES.body1, lineHeight: 36},
  body2: {fontFamily: 'Roboto-Regular', fontSize: SIZES.body2, lineHeight: 30},
  body3: {fontFamily: 'Roboto-Regular', fontSize: SIZES.body3, lineHeight: 22},
  body4: {fontFamily: 'Roboto-Regular', fontSize: SIZES.body4, lineHeight: 22},
  body5: {fontFamily: 'Roboto-Regular', fontSize: SIZES.body5, lineHeight: 22},
};

const appTheme = {COLORS, SIZES, FONTS, MetricsSizes};

export default appTheme;
