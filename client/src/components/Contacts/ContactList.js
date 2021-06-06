import React, {useEffect} from 'react';
import Contact from "./Contact";
import {useDispatch, useSelector} from "react-redux";
import {fetchChats} from "../../requests/chats";
import {getChats, getMobile, getUser} from "../../redux/selectors";
import ChatBar from "./ChatBar";
import {addNewChannel, addNewChat, changeUserToDialog, updateUserToChats} from "../../redux/actions";
import SideTitle from "./SideTitle";

function ContactList(props) {
  const socket = props.socket;
  const dispatch = useDispatch();
  const user = useSelector(getUser)
  const chats = useSelector(getChats)
  useEffect(() => {
    dispatch(fetchChats(user.id))
    socket.on('replaceUserToChat', (data) => {
      dispatch(updateUserToChats(user.id, data));
      dispatch(changeUserToDialog(data));
    })
    socket.on('addChat', (data) => {
      dispatch(addNewChat(data));
    })
    socket.on('addNewChannel', (data) => {
      dispatch(addNewChannel(data));
    })
  }, [])
  const mobile = useSelector(getMobile)
  return (
    <section className={`main-window__contacts-container${mobile.isMobile && !mobile.isMenuOpen
      ? ' main-window__contacts-container_moved'
      : ''}`}>
      <ul className="main-window__contacts contacts">
        {chats.chats.length > 0 && <SideTitle title="Active chats" />}
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
        {chats.channels.length > 0 && <SideTitle title="Public channels" />}
        {chats.channels.map(el => {
          return (<ChatBar name={el.name} key={`${el.type}${el.id}`} type={el.type} id={el.id} owner={el.owner}
                           unread={false}/>)
        })}
        {chats.users.length > 0 && <SideTitle title="Other Users" />}
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
