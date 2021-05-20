import React from 'react';

function SideTab(props) {
  return (
    <li className="contacts__contact contact">
      <div className="contact__picture-wrap picture-wrap">
        {props.picture
          ? <img src={props.picture} alt={`${props.topLine} chat`} className="contact__picture" />
          : props.topLine.charAt(0).toUpperCase()}
      </div>
      <div className="contact__text-wrap">
        <span className="contact__name">{props.topLine}</span>
        <span className="contact__last-message">
          {/*<span className="contact__last-message_from">You:</span>*/}
          <span className="contact__last-message_content">{props.bottomLine}</span>
        </span>
      </div>
    </li>
  );
}

export default SideTab;
