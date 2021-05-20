import React from 'react';
import MessageGroup from "../Messages/MessageGroup";

function Chat(props) {
  const groups = props.messageGroups || [];
  const groupList = groups.map((group, i) => {
    return <MessageGroup username={group.user.username} name={group.user.name}
                         messages={group.messages} key={i.toString()} />
  })
  return (
    <div className="chat-box__box">
      {groupList}
    </div>
  );
}

export default Chat;
