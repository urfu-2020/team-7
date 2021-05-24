import React from 'react';
import SideTab from "./SideTab";

function ChatBar(props) {
  return (
    <SideTab picture={null} topLine={props.name} bottomLine="" type={props.type} id={props.id} owner={props.owner}
             unread={props.unread}/>
  );
}

export default ChatBar;
