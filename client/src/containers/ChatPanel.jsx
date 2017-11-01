import React from 'react';
import ReactDOM from 'react-dom';
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
      userMsg: '',
      messages: []
    }

    // bind methods

    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.addMessage = this.props.addMessage(this);
    console.log(this.addMessage);

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
        resolve(responseJSON);
      })
    });

  }




  // update the message based on the text input field value
  handleMessageChange(event) {
    this.setState({
      userMsg: event.target.value
    });
  }

  scrollToBottom() {
    const node = ReactDOM.findDOMNode(this.messagesEnd);
    node.scrollIntoView({behavior: "smooth"});
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    return (

      <div id='chat-panel' className={'panel ' + this.props.lightStatus}>

        <div id='chat-box'>
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
          <div style={{ float:"left", clear: "both" }}
           ref={(el) => { this.messagesEnd = el; }}>
          </div>
        </div>
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
              placeholder="Enter Message"
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
