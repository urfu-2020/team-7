import React from 'react';
import './login.css';
import logo from '../../logo.svg';

function Login(props) {
  const url = `/auth/github`;
  return (
    <>
      <img src={logo} alt="Logo" className="login-logo"/>
      <a href={url} className="link auth-link">Login via Github!</a>
    </>
  );
}

export default Login;
