import React, {useState} from 'react';
import HeaderMenu from "./HeaderMenu";
import './headermenu.css';

function Header(props) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handler = (e) => {
    e.preventDefault();
    setMenuOpen(!menuOpen);
  }

  return (
    <header className="main-window__header header">
      <div className="header__menu-container">
        <div className="header__menu-button" onClick={handler}>
          <i className="fas fa-bars"/>
        </div>
        { menuOpen && <HeaderMenu /> }
      </div>
      <span className="header__title">Kilogram</span>
      <span className="header__flex-filler flex-filler"/>
      <div className="header__back-button">
        <i className="fas fa-arrow-left"/>
      </div>
    </header>
  );
}

export default Header;
