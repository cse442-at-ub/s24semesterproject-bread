import React from 'react';
import './Main.css'; 
import eyeLogo from './Logo.png';

function Main() {

  const handleSignIn = () => {
    window.location.href = "/loginpage/";
  };

  return (
    <div className="main-container">
      <div className="bg">
        <main className="container">
          <div className="title-container">
            <img className="title" src={eyeLogo} alt="Logo" />
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
              <input className="textfield" type="email" placeholder="Enter your username" />
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
  <div className="link-container">
    <p className="link">Already on InSight? <a href="/loginpage/" className="link">Sign In</a></p>
  </div>
</div>
              </main>
              </div>
              </div>
  );
}

export default Main;
