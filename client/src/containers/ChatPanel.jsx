import React from 'react';
import Message from '../components/Message.jsx';
import Auth from '../modules/Auth.js';

class ChatPanel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userMsg: 'Enter Message',
      messages: [
        {
          name: "LightBot",
          message: "Hi there!",
          key: 0
        },
        {
          name: "Andrew",
          message: "Hey!",
          key: 1
        }
      ]
    }

    this.addMessage = this.addMessage.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
  }

  addMessage(event) {
    var messages = this.state.messages;
    var key = messages[messages.length - 1].key + 1;

    var newmessage = {
      name: 'John',
      message: this.state.userMsg,
      key: key
    };
    this.setState(prevState => ({
      messages: [...prevState.messages, newmessage]
    }),
      () => console.log(this.state.messages)
    );

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
            <Message key={msg.key} name={msg.name} message={msg.message}/>
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
