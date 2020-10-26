/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable require-jsdoc */
import * as React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { CssBaseline } from '@material-ui/core';
import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import theme from '../utils/theme';
import '../public/styles/app.scss';
import { useStore } from '../store';
import Hydrator from '../components/shared/Hydrator';
import useFavIcon from '../hooks/useFavIcon';
import Assets from '../utils/assets';

export default function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  useFavIcon(Assets.FAV_ICON);
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <Provider store={store}>
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Hydrator Component={Component} {...pageProps} />
            </MuiPickersUtilsProvider>
          </ThemeProvider>
        </MuiThemeProvider>
      </StylesProvider>
    </Provider>
  );
}
