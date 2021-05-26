import React from 'react';
import './popup.css';
import {useDispatch} from "react-redux";
import {closePopup} from "../../redux/actions";

function Popup(props) {
  const dispatch = useDispatch();
  const closeHandler = (e) => {
    e.preventDefault();
    dispatch(closePopup())
  }
  return (
    <div className="popup">
      <span className="popup__title">{props.title}</span>
      <i className="fas fa-times popup__close" onClick={closeHandler} />
      {props.content}
    </div>
  );
}

export default Popup;
