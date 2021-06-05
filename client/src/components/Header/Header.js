import React, {useState} from 'react';
import HeaderMenu from "./HeaderMenu";
import './headermenu.css';
import {useDispatch, useSelector} from "react-redux";
import {getMobile} from "../../redux/selectors";
import {closeChat} from "../../redux/actions";

function Header(props) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handler = (e) => {
    e.preventDefault();
    setMenuOpen(!menuOpen);
  }

  const mobile = useSelector(getMobile);
  const dispatch = useDispatch()

  const closeHandle = () => {
    dispatch(closeChat())
  }

  const backButton = (
    <div className="header__back-button" onClick={closeHandle}>
      <i className="fas fa-arrow-left"/>
    </div>
  )

  return (
    <header className="main-window__header header">
      <div className="header__menu-container">
        <div className="header__menu-button" onClick={handler}>
          <i className="fas fa-bars"/>
        </div>
        { menuOpen && <HeaderMenu socket={props.socket} /> }
      </div>
      <span className="header__title">Kilogram</span>
      <span className="header__flex-filler flex-filler"/>
      {mobile.isMobile && !mobile.isMenuOpen && backButton}
    </header>
  );
}

export default Header;
