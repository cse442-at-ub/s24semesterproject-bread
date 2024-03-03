import React from 'react';
import './signin.css';
import Main from '../../components/SignIncomponents/signin';
import NavBar from '../navBar/preNavBar';

function Login() {
  return (
    <div className="login-page">
      <NavBar/>
      <Main />
    </div>
  );
}

export default Login;

