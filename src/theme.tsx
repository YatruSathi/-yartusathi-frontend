import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: '#022B3A',
    },
    secondary: {
      main: '#fffffc',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;