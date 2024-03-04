// Main.js
import React, { useState } from 'react';
import './Main.css'; 
import eyeLogo from './eye.webp';
import signIn from '../../LoginLink';
import { handleEmailChange, handlePasswordChange, handleSignIn } from '../../Reject';

function Main() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  return (
    <div className="main-container">
          <div className="bg">
    <main className="container">

      <div className="title-container">
        <h2 className="title">InSight</h2> <img className="logo" src={eyeLogo} alt="Logo" />
      </div>
      <hr className="separator" />
      <div className="space"></div>
      <h3 className="subtitle">Sign In</h3>
      <form className="form">
        <div className="input">
          <label className="label">Email</label>
          <input className="textfield" type="email" value={email} onChange={(e) => handleEmailChange(e.target.value, setEmail)} placeholder="Enter your email" />
        </div>
        <div className="input">
          <label className="label">Password</label>
          <input className="textfield" type="password" value={password} onChange={(e) => handlePasswordChange(e.target.value, setPassword)} placeholder="Enter your password" />
        </div>
        <div className="forgot-password">
          <a href="#" className="link"></a>
        </div>
        <div className="extra-space"></div>
        <button className="primary" type="button" onClick={() => handleSignIn(email, password, signIn, setErrorMessage)}>Sign In</button>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </form>
      <div className="signup-link">
        <p className="link">New to Insight? <a href="/signuppage/" className="link">Sign Up</a></p>
      </div>
    </main>
    </div>
    </div>
  );
}

export default Main;