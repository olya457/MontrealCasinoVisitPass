import {Dimensions, Platform} from 'react-native';
import type {AccentName} from '../types/entities';

const {width} = Dimensions.get('window');

export const colors = {
  bg: '#070918',
  bgDeep: '#030511',
  card: '#121a34',
  cardSoft: '#18213f',
  cardMuted: '#202848',
  border: '#2b355c',
  borderSoft: '#202842',
  text: '#f2eddc',
  muted: '#a39c8c',
  faint: '#6f6a61',
  gold: '#e0b923',
  goldDark: '#9d7d12',
  blue: '#61a8ff',
  orange: '#ff862f',
  teal: '#0bc09a',
  violet: '#9b78ff',
  pink: '#f45ba9',
  green: '#35d47c',
  danger: '#ed4f63',
  black: '#000000',
  white: '#ffffff',
};

export const accentColors: Record<AccentName, string> = {
  gold: colors.gold,
  blue: colors.blue,
  orange: colors.orange,
  teal: colors.teal,
  violet: colors.violet,
  pink: colors.pink,
  green: colors.green,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  page: width < 360 ? 14 : 20,
};

export const radii = {
  sm: 8,
  md: 12,
  lg: 18,
  pill: 999,
};

export const typography = {
  title: width < 360 ? 24 : 28,
  h1: width < 360 ? 22 : 26,
  h2: width < 360 ? 18 : 21,
  body: width < 360 ? 13 : 15,
  small: width < 360 ? 11 : 12,
};

export const platformSpace = {
  androidEdge: 30,
  tabBottom: Platform.OS === 'android' ? 30 : 20,
};
