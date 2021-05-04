import React from 'react';

function SendArea(props) {
  return (
    <div className="chat-box__send-area">
      <label htmlFor="chat-message" className="chat-box__input-wrap">
        <textarea name="chat-message" id="chat-message" className="chat-box__message-input"
                  placeholder="Write a message..."/>
      </label>
      <div className="chat-box__send-button">
        <i className="far fa-paper-plane"/>
      </div>
    </div>
  );
}

export default SendArea;
