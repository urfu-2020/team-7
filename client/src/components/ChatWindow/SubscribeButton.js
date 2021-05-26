import React from 'react';
import './subscribe.css';

function SubscribeButton(props) {
  const clickHandler = (e) => {
    e.preventDefault();

  }

  return (
    <div className="subscribe" onClick={clickHandler}>
      {props.content}
    </div>
  );
}

export default SubscribeButton;
