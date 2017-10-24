import React from 'react';

const Message = ({name, message}) => (
  <div id='message'>
    <span id='message-name'>{name}:</span>
    <span id='message-content'>{message}</span>
  </div>
);

export default Message;
