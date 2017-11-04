import React from 'react';

import { Card, CardTitle } from 'material-ui/Card';
import Auth from '../modules/Auth';
import DashboardPage from '../containers/DashboardPage.jsx';
const jwt = require('jsonwebtoken');
import config from '../../../config';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='panel-wrapper'>
        {
          Auth.isUserAuthenticated() == false ? (
            <Card className="container">
              <CardTitle title="LightBot" subtitle="An intelligent light" />
            </Card>
          ) : (
            <DashboardPage userJSON={this.props.userJSON}/>
          )
        }
      </div>
    )
  }
};

export default HomePage;
