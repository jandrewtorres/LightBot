import React from 'react';
import ChatPanel from '../containers/ChatPanel.jsx';
import Modal from './Modal.jsx';
import FeedbackForm from './FeedbackForm.jsx';
import 'react-select-plus/dist/react-select-plus.css';
import LightBulbPanel from '../containers/LightBulbPanel.jsx';

const Dashboard = ({isModalOpen, toggleModal, lightStatus,
  setLightStatus, messages, addMessage, saveUserAction}) => (
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
      messages={messages}
      addMessage={addMessage}
    />
    <LightBulbPanel
      lightStatus={lightStatus}
      toggleModal={toggleModal}
      setLightStatus={setLightStatus}
      saveUserAction={saveUserAction}
    />
  </div>
);

export default Dashboard;
