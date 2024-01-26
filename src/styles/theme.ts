import { DefaultTheme } from '@react-navigation/native';

export type SizeKey = keyof typeof theme.size;

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#E87000',
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
