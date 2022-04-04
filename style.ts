import { TextConfig } from 'konva/lib/shapes/Text';

export const Colors = {
  blue: '#4DA3D4',
  lightGrey: '#EEF0F0',
  darkSlate: '#424e54',
  teal: '#00B2A9',
  orange: '#F47721',
  green: '#39B620',
};

export const textStyle: TextConfig = {
  fill: 'white',
  fontSize: 16,
  fontFamily: 'Arial',
  fontStyle: '400',
};

export const boldStyle: TextConfig = {
  ...textStyle,
  fontSize: 18,
  fontStyle: 'bold',
};
