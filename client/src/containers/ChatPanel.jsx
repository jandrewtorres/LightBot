import React from 'react';
import Message from '../components/Message.jsx';
import Auth from '../modules/Auth.js';

class ChatPanel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userMsg: 'Enter Message',
      messages: []
    }

    this.addMessage = this.addMessage.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
  }

  getBotMessage() {
    
  }

  addMessage(event) {
    var messages = this.state.messages;

    var key = messages.length > 0 ?
      messages[messages.length - 1].key + 1
      : 0;

    var newmessage = {
      name: 'John',
      message: this.state.userMsg,
      key: key
    };

    key = key + 1;

    var botmessage = {
      name: 'LightBot',
      message: this.state.userMsg,
      key: key
    }

    this.setState(prevState => ({
      messages: [...prevState.messages, newmessage]
    }));

    event.preventDefault();
  }

  handleMessageChange(event) {
    this.setState({
      userMsg: event.target.value
    });
  }

  render() {
    return (
      <div id='chat-panel' className='panel'>
        {
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
