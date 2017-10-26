import React from 'react';
import ChatPanel from '../containers/ChatPanel.jsx';
import Modal from './Modal.jsx';
import FeedbackForm from './FeedbackForm.jsx';

const defaultLightbulb = require('../../../images/lightbulb.png');

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

const Dashboard = ({handleFeedbackSubmit, isModalOpen, toggleModal, lightStatus, setLightStatus}) => (
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
    />
    <LightBulbPanel
      lightStatus={lightStatus}
      toggleModal={toggleModal}
    />
  </div>
);

export default Dashboard;
