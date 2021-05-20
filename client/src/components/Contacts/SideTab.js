import React from 'react';
import {useDispatch} from "react-redux";
import {fetchMessages} from "../../requests/messages";

function SideTab(props) {
  const dispatch = useDispatch();
  const handler = (e) => {
    e.preventDefault();
    dispatch(fetchMessages(props.type, props.id, props.owner))
  }
  return (
    <li className="contacts__contact contact" onClick={handler}>
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
