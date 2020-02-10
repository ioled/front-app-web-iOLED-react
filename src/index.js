// React and Redux.
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
// Import components.
import App from './components/App';
// Redux reducers.
import reducers from './reducers';

import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

// Create redux store.
const store = createStore(reducers, applyMiddleware(reduxThunk));

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#fff',
      main: '#00EAA6',
      dark: '#000',
    },
    secondary: {
      main: '#fff',
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: 12,
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,

  document.querySelector('#root'),
);
