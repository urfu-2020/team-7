import React from 'react';
import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import ContactList from "../Contacts/ContactList";
import ChatWindow from "../ChatWindow/ChatWindow";

function MainPage(props) {
  return (
    <div className="main-window">
      <Header />
      <SearchBar />
      <ContactList />
      <ChatWindow />
    </div>
  );
}

export default MainPage;
