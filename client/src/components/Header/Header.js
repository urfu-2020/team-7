import React from 'react';

function Header(props) {
  return (
    <header className="main-window__header header">
      <div className="header__menu-button">
        <i className="fas fa-bars"/>
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
