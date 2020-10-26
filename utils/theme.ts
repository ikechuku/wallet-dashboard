import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    secondary: {
      light: '#ff4982',
      main: '#ff276a',
      dark: '#f2195d',
      contrastText: '#fff',
    },
    primary: {
      light: /* '#263aa7' */ '#2033a0',
      main: '#102181',
      dark: '#071560',
      contrastText: '#414042',
    },
    info: {
      main: '#00b3f5',
    },
  },
  typography: {
    fontFamily: 'Cerebri',
    button: {
      letterSpacing: '1px',
      textTransform: 'none',
      color: '#fff',
    },
  },
});
