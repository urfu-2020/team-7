import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getMessages, getUser} from "../../redux/selectors";
import {sendMessage} from '../../requests/messages';

function SendArea() {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const messages = useSelector(getMessages);
  const user = useSelector(getUser);
  const inputRef = useRef(null);
  const [fired, setFired] = useState(false);
  const sendHandler = (e) => {
    e.preventDefault();

    if (message.length === 0 || fired) return
    setFired(true)
    // type, content, from: {id, name, username}, to: {type, id}
    const data = {to: {type: messages.type, id: messages.id}, from: user, content: {type: 'TEXT', value: message}};
    // socket.emit('sendMessage', data)
    dispatch(sendMessage(data))
    if (inputRef.current) {
      inputRef.current.value = '';
      setMessage('');
    }
  }
  const keyPressHandler = (e) => {
    if (e.key === 'Enter') {
      if (!e.shiftKey) {
        sendHandler(e);
      }
    }
  }
  const keyUpHandler = (e) => {
    if (e.key === 'Enter') {
      setFired(false);
    }
  }
  return (
    <div className="chat-box__send-area">
      <label htmlFor="chat-message" className="chat-box__input-wrap">
        <textarea name="chat-message" id="chat-message" className="chat-box__message-input"
                  placeholder="Write a message..." onChange={e => setMessage(e.target.value.trim())}
                  ref={inputRef} onKeyPress={keyPressHandler} onKeyUp={e => keyUpHandler(e)}/>
      </label>
      <div className="chat-box__send-button" onClick={sendHandler}>
        <i className="far fa-paper-plane"/>
      </div>
    </div>
  );
}

export default SendArea;
