import React from 'react';
import Message from '../components/Message.jsx';
import Auth from '../modules/Auth.js';

/**
  *
  */
class ChatPanel extends React.Component {
  /**
    * Class constructor
    */
  constructor(props) {
    super(props);

    // set state
    this.state = {
      userMsg: 'Enter Message',
      messages: []
    }

    // bind methods
    this.addMessage = this.addMessage.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
  }

  /** fetch bot json response from apiai
   * @param String usermessage - get json response from api ai
   */
  getBotMessage(usermessage) {
    return new Promise(function(resolve, reject) {
      fetch('https://light-bot.herokuapp.com/botresponse?msg=' + usermessage, {
        method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJSON) => {
        resolve(responseJSON.result.fulfillment.speech);
      })
    });

  }

  /** Add message to messages in state. After updating state, the DOM will
   *  automatically update with the new message.
   *  @param {event}
   */
  addMessage(event) {
    // prevent default form submit
    event.preventDefault();

    // get current messages from state
    var messages = this.state.messages;

    // increment key by one
    var key = messages.length > 0 ?
      messages[messages.length - 1].key + 1
      : 0;

    // create the new user message object
    var newmessage = {
      name: 'John',
      message: this.state.userMsg,
      key: key
    };

    // get the bot message, then create bot message and set state to update
    // dom with new message from bot
    this.getBotMessage(newmessage.message)
    .then((msg) => {
      var botmessage = {
        name: 'LightBot',
        message: msg,
        key: key
      }

      // set the state with new user message and bot message
      this.setState(prevState => ({
        messages: [...prevState.messages, newmessage, botmessage]
      }));
    })
  }

  // update the message based on the text input field value
  handleMessageChange(event) {
    this.setState({
      userMsg: event.target.value
    });
  }

  render() {
    return (
      <div id='chat-panel' className='panel'>
        {
          // map the messages into Message componenents
          this.state.messages.map((msg) => (
            <Message
              key={msg.key}
              name={msg.name}
              message={msg.message}
            />
          ))
        }
        <form
          name="message"
          action=""
          onSubmit={ this.addMessage }>

          <div id="submit-msg-wrapper">
            <input
              name="user-msg"
              type="text"
              value={ this.state.userMsg }
              onChange={ this.handleMessageChange }
              id="user-msg"
            />
            <input
              name="submit-msg"
              type="submit"
              id="submit-msg"
              value="Send"
            />
          </div>
        </form>
      </div>
    );
  }
};

export default ChatPanel;
