import React from 'react';
import ChatPanel from '../containers/ChatPanel.jsx';
import Modal from './Modal.jsx';

const defaultLightbulb = require('../../../images/lightbulb.png');

const LightBulbPanel = ({lightStatus, toggleModal}) => (
  <div id="lightbulb-panel" className={"panel " + lightStatus}>
    <img src={ defaultLightbulb }  />
    <button onClick={toggleModal}>
      Submit Feedback
    </button>
  </div>
);

const Dashboard = ({isModalOpen, toggleModal, lightStatus, setLightStatus}) => (
  <div className='panel-wrapper'>
    <Modal
      show={isModalOpen}
      onClose={toggleModal}
    >
      <p> Modal Content</p>
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
