import React from 'react';
import './headermenu.css';

function HeaderMenu(props) {
  return (
    <ul className="header__menu">
      <li className="header__menu-item">
        <a className="link" href="/logout">
          Logout
        </a>
      </li>
    </ul>
  );
}

export default HeaderMenu;
