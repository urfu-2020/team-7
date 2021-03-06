import React from 'react';
import MessageProfilePicture from "./MessageProfilePicture";
import Message from "./Message";

function MessageGroup(props) {
  const messages = props.messages || [];
  const messageList = messages.map((message, i) => {
    const el = messages[messages.length - 1 - i];
    const date = new Date(el.createdAt);
    const time = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    return (<Message key={i.toString()} content={el.content} time={time} />)
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
