import React, {useEffect} from 'react';
import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import ContactList from "../Contacts/ContactList";
import ChatWindow from "../ChatWindow/ChatWindow";
import io from 'socket.io-client';
import {useDispatch, useSelector} from "react-redux";
import {getMobile, getPopup, getUser} from "../../redux/selectors";
import Popup from "../Popups/Popup";
import {showPopup, switchToFull, switchToMobile} from "../../redux/actions";

const axios = require('axios');

function MainPage() {
  const socket = io();
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const mobile = useSelector(getMobile);
  const width = window.innerWidth;
  if (!mobile.isMobile && width <= 600) {
    dispatch(switchToMobile())
  } else if (mobile.isMobile && width > 600) {
    dispatch(switchToFull())
  }
  useEffect(() => {
    socket.on('connect', () => {
      axios.put(`/api/users/${user.id}/socket/`, {id: socket.id}, {withCredentials: true})
        .catch(err => dispatch(showPopup('Socket error', err.message)))
    })
  }, [])
  const popup = useSelector(getPopup);
  return (
    <div className="main-window">
      {popup.shouldShow && <Popup title={popup.title} content={popup.content} />}
      <Header socket={socket} />
      <SearchBar />
      <ContactList socket={socket}/>
      <ChatWindow socket={socket}/>
    </div>
  );
}

export default MainPage;
