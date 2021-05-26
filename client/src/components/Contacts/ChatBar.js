import React from 'react';
import SideTab from "./SideTab";

function ChatBar(props) {
  const bottom = props.type === 'GROUP' ? 'Group chat' : 'Public channel'
  return (
    <SideTab picture={null} topLine={props.name} bottomLine={bottom} type={props.type} id={props.id} owner={props.owner}
             unread={props.unread}/>
  );
}

export default ChatBar;
