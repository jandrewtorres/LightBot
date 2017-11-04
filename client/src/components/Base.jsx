import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import TitleBar from './TitleBar.jsx';
import LoginPage from '../containers/LoginPage.jsx';
import SignUpPage from '../containers/SignUpPage.jsx';
import HomePage from './HomePage.jsx';
import { Switch, Route } from 'react-router-dom';
import Auth from '../modules/Auth';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userJSON: this.getUserJSON()
    }
  }

  getUserJSON() {
    return new Promise(function(resolve, reject) {
      if(Auth.isUserAuthenticated()) {
        Auth.getUserJSON()
        .then(function (userJSON) {
          resolve(userJSON)
        });
      }
      else {
        resolve(null);
      }
    });
  }

  render() {
    if(!this.state.userJSON) return null;
    return (
      <div id='main-wrapper'>
        <TitleBar userJSON={this.state.userJSON} />
          <Switch>
            <Route exact path='/'
              render={() => <HomePage userJSON={this.state.userJSON}/>}
            />
            <Route exact path='/signup' component={SignUpPage} />
            <Route exact path='/login' component={LoginPage} />
          </Switch>
      </div>
    )
  }
}

export default Base;
