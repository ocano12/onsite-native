import { DefaultTheme } from '@react-navigation/native';

export type SizeKey = keyof typeof theme.size;

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#E87000',
    text: '#312C28',
    white: 'white',
    border: '#CECFD0',
  },
  font: {
    small: 8,
    medium: 12,
    default: 16,
    large: 24,
    xlarge: 32,
    xxl: 42,
  },
  fontWeight: {
    normal: '400',
    bold: '600',
  },
  size: {
    small: '16',
    medium: '24',
    large: '32',
    xlarge: '64',
  },
};

export const getSize = (size: SizeKey): string => {
  return theme.size[size];
};
