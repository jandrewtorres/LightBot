import React from 'react';
import ChatPanel from '../containers/ChatPanel.jsx';

const defaultLightbulb = require('../../../images/lightbulb.png');

const LightBulbPanel = ({lightStatus}) => (
  <div id="lightbulb-panel" className={"panel " + lightStatus}>
    <img src={ defaultLightbulb }  />
  </div>
);

const Dashboard = ({lightStatus, setLightStatus}) => (
  <div className='panel-wrapper'>
    <ChatPanel lightStatus={lightStatus} setLightStatus={setLightStatus}/>
    <LightBulbPanel lightStatus={lightStatus}/>
  </div>
);

export default Dashboard;
