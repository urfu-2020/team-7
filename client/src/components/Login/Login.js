import React from 'react';
import './login.css';
import logo from '../../logo.svg';

function Login(props) {
  const url = `${process.env.REACT_APP_SERVER_HOME_URL}:${process.env.REACT_APP_SERVER_PORT}/auth/github`;
  return (
    <>
      <img src={logo} alt="Logo" className="login-logo"/>
      <a href={url} className="link auth-link">Login via Github!</a>
    </>
  );
}

export default Login;
