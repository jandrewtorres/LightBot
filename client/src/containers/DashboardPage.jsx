import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';

class DashboardPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    // set state
    this.state = {
      lightStatus: 'dark',
      isFeedbackModalOpen: false
    }

    this.setLightStatus = this.setLightStatus.bind(this);
  }

  toggleModal = () => {
    this.setState({
      isFeedbackModalOpen: !this.state.isFeedbackModalOpen
    });
  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/dashboard');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
          secretData: xhr.response.message
        });
      }
    });
    xhr.send();
  }

  setLightStatus(status) {
    // set the state with new user message and bot message
    this.setState(prevState => ({
      lightStatus: status
    }));
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <Dashboard
        isModalOpen={this.state.isFeedbackModalOpen}
        toggleModal={this.toggleModal}
        lightStatus={this.state.lightStatus}
        setLightStatus={this.setLightStatus}
      />);
  }

}

export default DashboardPage;
