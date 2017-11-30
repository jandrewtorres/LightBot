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
      userMsg: ''
    }

    // bind methods
    this.addMessage = this.addMessage.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
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

  addMessage(event, userMsg) {
    // prevent default form submit
    event.preventDefault();

    this.setState({
      userMsg: ''
    });

    this.props.addMessage(userMsg);

  }

  render() {
    return (
      <div id='chat-panel' className={'panel ' + this.props.lightStatus}>
        <div id='chat-box'>
          {
            // map the messages into Message componenents
            this.props.messages.map((msg) => (
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
          onSubmit={ (e) => this.addMessage(e, this.state.userMsg) }>

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
              style={{border: '1px solid black'}}
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
