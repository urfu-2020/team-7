import React from 'react';
import './headermenu.css';
import {useDispatch, useSelector} from "react-redux";
import {getTheme, getUser} from "../../redux/selectors";
import {switchThemeChain} from "../../requests/themes";
import {showPopup} from "../../redux/actions";
import CreateChatForm from "../Popups/CreateChatForm";
import CreateChannelForm from "../Popups/CreateChannelForm";

function HeaderMenu(props) {
  const theme = useSelector(getTheme);
  const dispatch = useDispatch();
  const user = useSelector(getUser)
  const switchTheme = (e) => {
    e.preventDefault();
    const to = theme === 'DARK' ? 'LIGHT' : 'DARK'
    dispatch(switchThemeChain(user.id, to))
  }
  const showGroupChat = (e) => {
    e.preventDefault();
    dispatch(showPopup('Create group chat', <CreateChatForm socket={props.socket}/>))
  }
  const showChannel = (e) => {
    e.preventDefault();
    dispatch(showPopup('Create new channel', <CreateChannelForm socket={props.socket} />))
  }
  return (
    <ul className="header__menu">
      <li className="header__menu-item" onClick={showGroupChat}>
        Create group chat
      </li>
      <li className="header__menu-item" onClick={showChannel}>
        Create new channel
      </li>
      <li className="header__menu-item" onClick={switchTheme}>
        {`Theme:${theme}`}
      </li>
      <li className="header__menu-item">
        <a className="link" href="/logout">
          Logout
        </a>
      </li>
    </ul>
  );
}

export default HeaderMenu;
