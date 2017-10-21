import React from 'react';

import { Card, CardTitle } from 'material-ui/Card';
import Auth from '../modules/Auth';
import DashboardPage from '../containers/DashboardPage.jsx';


class HomePage extends React.Component {

  render() {
    return (
      <div className='panel-wrapper'>
        {Auth.isUserAuthenticated() == false ? (
          <Card className="container">
            <CardTitle title="Welcome!!" subtitle="LightBot" />
          </Card> ) : (
            <DashboardPage/>
          )
        }
      </div>
    )
  }
};

export default HomePage;
