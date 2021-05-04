import React from 'react';
import './login.css';
import logo from '../../logo.svg';

function Login(props) {
  return (
    <>
      <img src={logo} alt="Logo" className="login-logo"/>
      <a href="/auth/github/" className="link auth-link">Login via Github!</a>
    </>
  );
}

export default Login;
