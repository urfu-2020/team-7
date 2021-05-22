import React from 'react';
import MessageGroup from "../Messages/MessageGroup";

function Chat(props) {
  const groups = props.messageGroups || [];
  const groupList = groups.map((group, i) => {
    const el = groups[groups.length - 1 - i]
    return <MessageGroup username={el.user.username} name={el.user.name}
                         messages={el.messages} key={i.toString()} />
  })
  return (
    <div className="chat-box__box">
      {groupList}
    </div>
  );
}

export default Chat;
