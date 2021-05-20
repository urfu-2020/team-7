import React, {useEffect} from 'react';
import Contact from "./Contact";
import {useDispatch, useSelector} from "react-redux";
import {fetchChats} from "../../requests/chats";
import {getChats, getUser} from "../../redux/selectors";
import ChatBar from "./ChatBar";

function ContactList() {
  const dispatch = useDispatch();
  const user = useSelector(getUser)
  const chats = useSelector(getChats)
  useEffect(() => {
    dispatch(fetchChats(user.id))
  }, [])
  return (
    <section className="main-window__contacts-container">
      <ul className="main-window__contacts contacts">
        {/* eslint-disable-next-line array-callback-return */}
        {chats.chats.map((el) => {
          return (
            el.type === 'DIALOG'
              ? <Contact username={el.user.username} name={el.user.name} key={`DIALOG${el.user.id}`} />
              : <ChatBar name={el.name} key={`${el.type}${el.id}`}/>
        )
        })}
        {/* eslint-disable-next-line array-callback-return */}
        {chats.users.map(el => {
          return (<Contact username={el.username} name={el.name} key={`USER${el.id}`}/>)
        })}
      </ul>
    </section>
  );
}

export default ContactList;
