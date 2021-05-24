import React from 'react';
import './headermenu.css';
import {useDispatch, useSelector} from "react-redux";
import {getTheme, getUser} from "../../redux/selectors";
import {switchThemeChain} from "../../redux/actions";

function HeaderMenu(props) {
  const theme = useSelector(getTheme);
  const dispatch = useDispatch();
  const user = useSelector(getUser)
  const switchTheme = (e) => {
    e.preventDefault();
    const to = theme === 'DARK' ? 'LIGHT' : 'DARK'
    dispatch(switchThemeChain(user.id, to))
  }
  return (
    <ul className="header__menu">
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
