// Main.js

import React from 'react';
import './Main.css'; 
import eyeLogo from './eye.webp';

function Main() {

  const handleSignIn = () => {
    window.location.href = "https://www-student.cse.buffalo.edu/CSE442-542/2024-Spring/cse-442ac/Login/";
  };

  return (
    <div className="main-container">
    <div className="bg">
<main className="container">
<div className="title-container">
        <h2 className="title">InSight</h2> <img className="logo" src={eyeLogo} alt="Logo" />
      </div>
  <hr className="separator" />
  <div className="space"></div>
  <h3 className="subtitle">Sign Up</h3>
  <form className="form">
    <div className="input">
      <label className="label">Email</label>
      <input className="textfield" type="email" placeholder="Enter your email" />
    </div>
    <div className="input">
      <label className="label">Username</label>
      <input className="textfield" type="email" placeholder="Enter your Username" />
    </div>
    <div className="input">
      <label className="label">Password</label>
      <input className="textfield" type="password" placeholder="Enter your password" />
    </div>
    <div className="input">
      <label className="label">Confirm Password</label>
      <input className="textfield" type="password" placeholder="Re-enter your password" />
    </div>
    <div className="forgot-password">
      <a href="#" className="link"></a>
    </div>
    <div className="extra-space"></div>
    <button className="primary" type="button" onClick={handleSignIn}>Sign Up</button>
  </form>
  <div className="signup-link">
  <p className="link">Already on InSight? <a href="https://www-student.cse.buffalo.edu/CSE442-542/2024-Spring/cse-442ac/Login/" className="link">Sign In</a></p>
  </div>

</main>
</div>
</div>
  );
}

export default Main;
