import React, {useEffect} from 'react';
import SendArea from "./SendArea";
import Chat from "./Chat";
import {useDispatch, useSelector} from "react-redux";
import {getMessages, getUser} from "../../redux/selectors";
import {receiveMessage} from "../../redux/actions";
import SubscribeButton from "./SubscribeButton";

function ChatWindow(props) {
  const socket = props.socket;
  const messages = useSelector(getMessages);
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  useEffect(() => {
    socket.on('receiveMessage', (data) => {
      dispatch(receiveMessage(data))
    })
  }, [])

  return (
    <section className="main-window__chats-container">
      <span className="main-window__chat-select-message">Please select a chat to start messaging 🥺</span>
      {messages.type !== null && (
        <div className="main-window__chat-box chat-box">
          <Chat messageGroups={messages.messages} />
          {(messages.type !== 'CHANNEL')
            ? <SendArea socket={props.socket} />
            : <SubscribeButton content="subscribe"/>}
        </div>
      )}
    </section>
  );
}

export default ChatWindow;
