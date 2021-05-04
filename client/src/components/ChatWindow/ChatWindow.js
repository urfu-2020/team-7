import React from 'react';
import SendArea from "./SendArea";
import Chat from "./Chat";

function ChatWindow(props) {
  const messageGroups = [
    {username: 'BigBird15', name: '', messages: [
        {content: 'Посмотрю', time: '23:53'},
        {content: 'Как приду домой', time: '23:53'},
        {content: 'Хорошо', time: '23:53'},
      ]},
    {username: 'Imessal', name: '', messages: [
        {content: 'Ок', time: '23:52'},
      ]},
    {username: 'hastyulia', name: 'Yulia Hast', messages: [
        {content: 'Да, сейчас', time: '23:50'},
      ]},
    {username: 'SavelevMatthew', name: 'Aboba', messages: [
        {content: '??', time: '23:50'},
        {content: 'Может кто пулл-реквест проверить?', time: '23:10'},
        {content: 'Привет', time: '23:09'},
      ]}
  ]
  return (
    <section className="main-window__chats-container">
      <span className="main-window__chat-select-message">Please select a chat to start messaging 🥺</span>
      <div className="main-window__chat-box chat-box">
        <Chat messageGroups={messageGroups} />
        <SendArea />
      </div>
    </section>
  );
}

export default ChatWindow;
