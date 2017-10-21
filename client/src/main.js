import React from 'react';
import ReactDOM from 'react-dom';
import Base from './components/Base.jsx';
import style from './stylesheets/main.scss';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { BrowserRouter } from 'react-router-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';

// remove tap delay, essential for material-ui to work properly
injectTapEventPlugin();

const render = (Component) => {
  return(
    ReactDOM.render(
      <MuiThemeProvider>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </MuiThemeProvider>,
    document.getElementById('App')
  ))
};

render(Base);
