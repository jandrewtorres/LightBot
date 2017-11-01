import React from 'react';
import ChatPanel from '../containers/ChatPanel.jsx';
import Modal from './Modal.jsx';
import FeedbackForm from './FeedbackForm.jsx';

const defaultLightbulb = require('../../../images/lightbulb.png');

import Select from 'react-select';

// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';

var options = [
    { value: 'red', label: 'Red' },
    { value: 'blue', label: 'Blue' },
    { value: 'green', label: 'Green' },
    { value: 'yellow', label: 'Yellow' },
    { value: 'oragne', label: 'Orange' }
];

function logChange(val) {
    console.log('Selected: ', val);
    return (
        <div>
            <ChatPanel event = {val}/>
        </div>
    );
}

/** Add message to messages in state. After updating state, the DOM will
 *  automatically update with the new message.
 *  @param {event}
 */
function addMessage(that) {

    return (event) => {

        console.log('event');
        console.log(event);

        console.log('that');
        console.log(that);
        // prevent default form submit
        event.preventDefault();

        that.setState({
            userMsg: ''
        })
        // get current messages from state
        var messages = that.state.messages;

        // Having trouble retrieving state -> need to call this with ChatPanel
        console.log('state');
        console.log(that.state);


        // increment key by one
        var key = messages.length > 0 ?
            messages[messages.length - 1].key + 1
            : 0;
        console.log(key);
        // create the new user message object
        var newmessage = {
            name: 'Me',
            message: that.state.userMsg,
            key: key
        };

        key = key + 1;
        console.log(key);
        // get the bot message, then create bot message and set state to update
        // dom with new message from bot
        that.getBotMessage(newmessage.message)
            .then((msg) => {
                var botmessage = {
                    name: 'LightBot',
                    message: msg.result.fulfillment.speech,
                    key: key
                }

                if (msg.result.metadata.intentName == "light_on") {
                    that.props.setLightStatus('light');
                }

                else if (msg.result.metadata.intentName == "light_dim") {
                    that.props.setLightStatus('dim');
                }
                else if (msg.result.metadata.intentName == "light_brighten") {
                    that.props.setLightStatus('brighten');
                }

                else if (msg.result.metadata.intentName == "light_off") {
                    that.props.setLightStatus('dark');
                }
                else if (msg.result.metadata.intentName == "light_color") {
                    var colors = ["green", "red", "blue", "purple", "pink", "orange"];
                    var color = msg.result.parameters.color;
                    if (colors.indexOf(color) > -1) {
                        that.props.setLightStatus(color);
                    }
                }
                else if (msg.result.metadata.intentName == "light_mood") {
                    var moods = ["love", "happy", "mad", "sad"];
                    var mood = msg.result.parameters.mood;
                    if (moods.indexOf(mood) > -1) {
                        that.props.setLightStatus(mood);
                    }
                }

                // set the state with new user message and bot message
                that.setState(prevState => ({
                    messages: [...prevState.messages, newmessage, botmessage]
                }));
            })
    }

}

const LightBulbPanel = ({lightStatus, toggleModal}) => (
  <div id="lightbulb-panel" className={"panel " + lightStatus}>
    <div id="bulb-wrapper">
      <img src={ defaultLightbulb }  />
    </div>
    <div id="submit-msg-wrapper">
      <button
        id='submit-msg-feedback'
        onClick={toggleModal}>
        Submit Feedback
      </button>
    </div>
  </div>
);

function onboardSelect(that) {
    return function(value) {
        console.log(that)
        var event = {
            target: {
                value
            },
            preventDefault: ()=>{}
        };
        addMessage(that)(event);
    }

}

const Dashboard = ({handleFeedbackSubmit, isModalOpen, toggleModal, lightStatus, setLightStatus, context}) => (
  <div className='panel-wrapper'>


    <Modal
      show={isModalOpen}
      onClose={toggleModal}
    >
      <div className='modal-content'>
        <FeedbackForm />
      </div>
    </Modal>
    <ChatPanel
      lightStatus={lightStatus}
      setLightStatus={setLightStatus}
      addMessage = {addMessage}

    />
      <div>

          <Select
              name="form-field-name"
              value="one"
              options={options}
              onChange={onboardSelect(context)}
          />
          <LightBulbPanel
              lightStatus={lightStatus}
              toggleModal={toggleModal}

          />
      </div>


  </div>
);

export default Dashboard;
