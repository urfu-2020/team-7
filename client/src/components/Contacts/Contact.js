import React from 'react';
import SideTab from "./SideTab";

function Contact(props) {
  const profilePath = `https://github.com/${props.username}.png`;
  const topLine = props.name || props.username;
  const bottomLine = `@${props.username}`;
  return (<SideTab picture={profilePath} topLine={topLine} bottomLine={bottomLine}
                   type={props.type} id={props.id} owner={null}/>)
}

export default Contact;
