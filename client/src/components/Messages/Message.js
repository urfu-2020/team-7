import React from 'react';

function Message(props) {
  return (
    <div className="messages__message message">
      <span className="message__content">{props.content}</span>
      <span className="message__time">{props.time}</span>
    </div>
  );
}

export default Message;
