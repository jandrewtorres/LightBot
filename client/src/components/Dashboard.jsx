import React from 'react';
import ChatPanel from '../containers/ChatPanel.jsx';

const defaultLightbulb = require('../../../images/lightbulb.png');

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
