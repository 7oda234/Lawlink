import { createContext } from 'react';

export const ThemeContext = createContext({
  mode: 'light',
  palette: 'blue',
  toggleMode: () => {},
  setPalette: () => {},
  palettes: ['blue', 'yellow', 'green', 'purple'],
});

