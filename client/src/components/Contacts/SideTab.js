import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchMessages} from "../../requests/messages";
import {getSearchFilter} from "../../redux/selectors";

function SideTab(props) {
  const dispatch = useDispatch();
  const handler = (e) => {
    e.preventDefault();
    dispatch(fetchMessages(props.type, props.id, props.owner))
  }
  const filter = useSelector(getSearchFilter).toLowerCase();
  return filter.length === 0 || props.topLine.toLowerCase().includes(filter) || props.bottomLine.toLowerCase().includes(filter)
    ? (
      <li className={`contacts__contact contact ${props.unread ? "contacts__contact_unread" : ""}`} onClick={handler}>
        <div className="contact__picture-wrap picture-wrap">
          {props.picture
            ? <img src={props.picture} alt={`${props.topLine} chat`} className="contact__picture"/>
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
    ) : null;
}

export default SideTab;
