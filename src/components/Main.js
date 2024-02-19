// Main.js

import React from 'react';
import './Main.css'; 
import eyeLogo from './eye.png'; // 导入 logo 图片

function Main() {
  return (
<main className="container">
<div className="title-container">
        <h2 className="title">InSight</h2> <img className="logo" src={eyeLogo} alt="Logo" />
      </div>
  <hr className="separator" />
  <h3 className="subtitle">Sign In</h3>
  <form className="form">
    <div className="input">
      <label className="label">Email</label>
      <input className="textfield" type="email" placeholder="Enter your email" />
    </div>
    <div className="input">
      <label className="label">Password</label>
      <input className="textfield" type="password" placeholder="Enter your password" />
    </div>
    <div className="forgot-password">
      <a href="#" className="link"></a>
    </div>
    <div className="extra-space"></div>
    <button className="primary" type="submit">Sign In</button>
  </form>
  <div className="signup-link">
    <p className="link">New to Insight? <a href="#" className="link">Sign up</a></p>
  </div>
</main>
  );
}

export default Main;
