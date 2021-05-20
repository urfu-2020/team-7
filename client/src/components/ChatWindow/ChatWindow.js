import React from 'react';
import SendArea from "./SendArea";
import Chat from "./Chat";
import {useSelector} from "react-redux";
import {getMessages} from "../../redux/selectors";

function ChatWindow() {
  const messages = useSelector(getMessages);
  return (
    <section className="main-window__chats-container">
      <span className="main-window__chat-select-message">Please select a chat to start messaging 🥺</span>
      {messages.type !== null && (
        <div className="main-window__chat-box chat-box">
          <Chat messageGroups={messages.messages} />
          {messages.type !== 'BLOG' && <SendArea />}
        </div>
      )}
    </section>
  );
}

export default ChatWindow;
