import React from 'react';
import './loginpage.css';
import Main from '../../components/SignIncomponents/Main';
//import Headers from '../../components/SignIncomponents/Header';
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

