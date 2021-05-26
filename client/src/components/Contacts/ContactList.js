import React, {useEffect} from 'react';
import Contact from "./Contact";
import {useDispatch, useSelector} from "react-redux";
import {fetchChats} from "../../requests/chats";
import {getChats, getMessages, getUser} from "../../redux/selectors";
import ChatBar from "./ChatBar";
import {addNewChat, changeUserToDialog, setUnread, updateUserToChats} from "../../redux/actions";

function ContactList(props) {
  const socket = props.socket;
  const dispatch = useDispatch();
  const user = useSelector(getUser)
  const chats = useSelector(getChats)
  const messages = useSelector(getMessages);
  useEffect(() => {
    dispatch(fetchChats(user.id))
    socket.on('replaceUserToChat', (data) => {
      dispatch(updateUserToChats(user.id, data));
      dispatch(changeUserToDialog(data));
    })
    socket.on('receiveMessage', (data) => {
      const chatId = data.message.chatId;
      if (messages.type !== 'USER' && messages.id === chatId) {
        dispatch(setUnread(data.message.chatId))
      }
    })
    socket.on('addChat', (data) => {
      dispatch(addNewChat(data));
    })
  }, [])
  return (
    <section className="main-window__contacts-container">
      <ul className="main-window__contacts contacts">
        {/* eslint-disable-next-line array-callback-return */}
        {chats.chats.map((el) => {
          return (
            el.type === 'DIALOG'
              ? <Contact username={el.user.username} name={el.user.name} key={`DIALOG${el.user.id}`}
                         type={el.type} id={el.id} unread={el.unread}/>
              : <ChatBar name={el.name} key={`${el.type}${el.id}`} type={el.type} id={el.id} owner={el.owner}
                         unread={el.unread}/>
        )
        })}
        {/* eslint-disable-next-line array-callback-return */}
        {chats.users.map(el => {
          return (<Contact username={el.username} name={el.name} key={`USER${el.id}`} type="USER" id={el.id}
                           unread={false}/>)
        })}
      </ul>
    </section>
  );
}

export default ContactList;
