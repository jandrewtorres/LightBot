import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import TitleBar from './TitleBar.jsx';
import LoginPage from '../containers/LoginPage.jsx';
import SignUpPage from '../containers/SignUpPage.jsx';
import HomePage from './HomePage.jsx';
import { Switch, Route } from 'react-router-dom';
import Auth from '../modules/Auth';

const Base = () => (
      <div id='main-wrapper'>
        <TitleBar userName='' />
          <Switch>
            <Route exact path='/' render={() => <HomePage />}/>
            <Route exact path='/signup' component={SignUpPage} />
            <Route exact path='/login' component={LoginPage} />
          </Switch>
      </div>
);

export default Base;
