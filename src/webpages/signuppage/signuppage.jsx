// App.js

import React from 'react';
import './signuppage.css';
import Main from '../../components/Signupcomponents/Main';
import NavBar from '../navBar/preNavBar';

function Signup() {
  return (
    <div className="App">
      <NavBar />
      <Main />
    </div>
  );
}

export default Signup;
