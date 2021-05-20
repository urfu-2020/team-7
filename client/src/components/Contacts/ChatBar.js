import React from 'react';
import SideTab from "./SideTab";

function ChatBar(props) {
  return (
    <SideTab picture={null} topLine={props.name} bottomLine="" />
  );
}

export default ChatBar;
