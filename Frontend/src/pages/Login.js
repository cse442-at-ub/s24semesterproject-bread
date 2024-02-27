import React from 'react';
import './Login.css';
import Main from './Logincomponents/Main';
import Headers from './Logincomponents/Header';

function Login() {
  return (
    <div className="login-page">
      <Headers/>
      <Main />
    </div>
  );
}

export default Login;

