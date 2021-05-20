import React, {useEffect} from 'react';
import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import ContactList from "../Contacts/ContactList";
import ChatWindow from "../ChatWindow/ChatWindow";
import io from 'socket.io-client';
import {useSelector} from "react-redux";
import {getUser} from "../../redux/selectors";

const socket = io();

function MainPage() {
  const user = useSelector(getUser);
  useEffect(() => {
    socket.emit('setId', user.id);
  }, [])
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
