// Main.js

import React from 'react';
import './Main.css'; 

function Main() {
  return (
    <main className="container">
      <h2 className="title">Insight</h2>
      <h3 className="subtitle">Login to Your Account</h3>
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
          <a href="#" className="link">Forgot password?</a>
        </div>
        <button className="primary" type="submit">Sign In</button>
      </form>
      <div className="signup-link">
        <p className="link">New to Insight? <a href="#" className="link">Join now</a></p>
      </div>
    </main>
  );
}

export default Main;
