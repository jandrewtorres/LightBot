import React from 'react';

const defaultLightbulb = require('../../../images/lightbulb.png');

const ChatPanel = () => (
  <div id='chat-panel' className='panel'>
    <div id='chat-box'></div>
    <form name="message" action="">
      <div id="submit-msg-wrapper">
        <input name="user-msg" type="text" id="user-msg" />
        <input name="submit-msg" type="button" id="submit-msg" value="Send" />
      </div>
    </form>
  </div>
);

const LightBulbPanel = () => (
  <div id="lightbulb-panel" className="panel">
    <img src={ defaultLightbulb } />
  </div>
);

const Dashboard = () => (
  <div className='panel-wrapper'>
    <ChatPanel />
    <LightBulbPanel />
  </div>
);

export default Dashboard;
