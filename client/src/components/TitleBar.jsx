import React from 'react';
import {Link} from 'react-router-dom';
import Auth from '../modules/Auth.js';

class TitleBar extends React.Component {

  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      SiteText: 'LightBot',
      loginText: 'Log In',
      signupText: 'Sign up',
      userWelcomeText: 'Hello ',
      redirect: false,
    };

    // bind class methods
    this.onLogOutClicked = this.onLogOutClicked.bind(this);
  }

  // Log user out on logout clicked
  onLogOutClicked()
  {
    Auth.deauthenticateUser();
  }

  // render the top bar based on user authentication status
  render() {
    return (
    <div id="title-bar">
        <div className="top-bar-left">
              <Link to="/">{this.state.SiteText}</Link>
              {false ? this.state.userWelcomeText : ''}
              <Link to="/" />
        </div>

        {Auth.isUserAuthenticated() ? (
          <Link className='top-bar-right-item' to="/login" onClick={this.onLogOutClicked}>Log out</Link>
        ) : (
          <div className="top-bar-right">
                   <Link className='top-bar-right-item' to="/login">{this.state.loginText}</Link>
                  <Link className='top-bar-right-item' to="/signup">{this.state.signupText}</Link>
          </div>
        )}

    </div>
    );
  }
}

export default TitleBar;
