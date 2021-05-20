import React from 'react';
import MessageProfilePicture from "./MessageProfilePicture";
import Message from "./Message";

function MessageGroup(props) {
  const messages = props.messages || [];
  const messageList = messages.map((message, i) => {
    const date = new Date(message.createdAt);
    const time = `${date.getHours()}:${date.getMinutes()}`;
    return (<Message key={i.toString()} content={message.content} time={time} />)
  })
  return (
    <div className="chat-box__message-group message-group">
      <MessageProfilePicture username={props.username} />
      <div className="message-group__messages messages">
        <span className="messages__author">{props.name || props.username}</span>
        {messageList}
      </div>
    </div>
  );
}

export default MessageGroup;
