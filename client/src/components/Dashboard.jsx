import React from 'react';
import ChatPanel from '../containers/ChatPanel.jsx';
import Modal from './Modal.jsx';
import FeedbackForm from './FeedbackForm.jsx';
import 'react-select-plus/dist/react-select-plus.css';
import LightBulbPanel from '../containers/LightBulbPanel.jsx';
import PredictedTimes from './PredictedTimes.jsx';

const Dashboard = ({isScheduleModalOpen, toggleScheduleModal, isModalOpen, toggleModal, lightStatus,
  setLightStatus, messages, addMessage, saveUserAction}) => (
  <div className='panel-wrapper'>
    <Modal
      show={isScheduleModalOpen}
      onClose={toggleScheduleModal}
    >
      <div className='modal-content'>
        <PredictedTimes />
      </div>
    </Modal>
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
      toggleScheduleModal={toggleScheduleModal}
      setLightStatus={setLightStatus}
      saveUserAction={saveUserAction}
    />
  </div>
);

export default Dashboard;
