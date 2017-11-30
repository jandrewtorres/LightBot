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
      isFeedbackModalOpen: false,
      isScheduleModalOpen: false,
      messages: [],
      msgKey: 0,
      userJSON: ''
    }

    this.props.userJSON.then(value => {
      this.setState({userJSON: value})
    })

    this.addMessage = this.addMessage.bind(this);
    this.setLightStatus = this.setLightStatus.bind(this);
  };

  /** fetch bot json response from apiai
   * @param String usermessage - get json response from api ai
   */
  fetchBotMessage(usermessage) {
    return new Promise(function(resolve, reject) {
      fetch('https://light-bot.herokuapp.com/botresponse?msg=' + usermessage, {
        method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJSON) => {
        resolve(responseJSON);
      })
    });
  }

  setLightStatusByIntent(msg) {
    if (msg.result.metadata.intentName == "light_on") {
        this.setLightStatus('light');
    }

    else if (msg.result.metadata.intentName == "light_dim") {
        this.setLightStatus('dim');
    }
    else if (msg.result.metadata.intentName == "light_brighten") {
        this.setLightStatus('brighten');
    }

    else if (msg.result.metadata.intentName == "light_off") {
        this.setLightStatus('dark');
    }
    else if (msg.result.metadata.intentName == "light_color") {
        var colors = ["green", "red", "blue", "purple", "pink", "orange"];
        var color = msg.result.parameters.color;
        if (colors.indexOf(color) > -1) {
            this.setLightStatus(color);
        }
    }
    else if (msg.result.metadata.intentName == "light_mood") {
        var moods = ["love", "happy", "mad", "sad"];
        var mood = msg.result.parameters.mood;
        if (moods.indexOf(mood) > -1) {
            this.setLightStatus(mood);
        }
    }
  }

  saveUserAction = (color, intentName) => {
    var userId = this.state.userJSON._id;
    var colorTwo = color != 'undefined' ? color : 'none';
    fetch('https://light-bot.herokuapp.com/saveuseraction', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: intentName,
        intentColor: colorTwo,
        userId: userId
      })
    });
  }

  addBotMessage(userMessage) {
    // get the bot message, then create bot message and set state to update
    // dom with new message from bot
    this.fetchBotMessage(userMessage)
    .then((msg) => {
      var botmessage = {
        name: 'LightBot',
        message: msg.result.fulfillment.speech,
        key: this.state.msgKey
      }

      this.setLightStatusByIntent(msg);

      // set the state with new user message and bot message
      this.setState(prevState => ({
        messages: [...prevState.messages, botmessage],
        msgKey: prevState.msgKey + 1
      }));

      this.saveUserAction(msg.result.parameters.color,
        msg.result.metadata.intentName);
    });
  }

  /** Add message to messages in state. After updating state, the DOM will
   *  automatically update with the new message.
   *  @param {event}
   */
  addMessage(usrMessage) {
    // get current messages from state
    var messages = this.state.messages;

    // create the new user message object
    var newmessage = {
      name: 'Me',
      message: usrMessage,
      key: this.state.msgKey
    };

    this.setState(prevState => ({
      messages: [...prevState.messages, newmessage],
      msgKey: prevState.msgKey + 1
    }), this.addBotMessage(usrMessage));
  }

  toggleModal = () => {
    this.setState({
      isFeedbackModalOpen: !this.state.isFeedbackModalOpen
    });
  }

  toggleScheduleModal = () => {
    this.setState({
      isScheduleModalOpen: !this.state.isScheduleModalOpen
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
        isScheduleModalOpen={this.state.isScheduleModalOpen}
        toggleScheduleModal={this.toggleScheduleModal}
        isModalOpen={this.state.isFeedbackModalOpen}
        toggleModal={this.toggleModal}
        lightStatus={this.state.lightStatus}
        setLightStatus={this.setLightStatus}
        messages={this.state.messages}
        addMessage={this.addMessage}
        saveUserAction={this.saveUserAction}
      />);
  }

}

export default DashboardPage;
