import React, { useState } from 'react';
import './Main.css'; 
import eyeLogo from './eye.webp';

function Main() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignIn = () => {
    if (email.endsWith('buffalo.edu')) {
      fetch('https://www-student.cse.buffalo.edu/CSE442-542/2024-Spring/cse-442ac/backend/login/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password: password,
          action: 'login',
        }),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.username && data.sessionID && data.userID) {
          window.location.href = "https://www-student.cse.buffalo.edu/CSE442-542/2024-Spring/cse-442ac/StartPage/";
        } else {
          setErrorMessage('Please check your email and password');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setErrorMessage('An error occurred while trying to sign in');
      });
    } else {
      setErrorMessage('Please use a buffalo.edu email address to sign in');
    }
  };

  return (
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
          <input className="textfield" type="email" value={email} onChange={handleEmailChange} placeholder="Enter your email" />
        </div>
        <div className="input">
          <label className="label">Password</label>
          <input className="textfield" type="password" value={password} onChange={handlePasswordChange} placeholder="Enter your password" />
        </div>
        <div className="forgot-password">
          <a href="#" className="link"></a>
        </div>
        <div className="extra-space"></div>
        <button className="primary" type="button" onClick={handleSignIn}>Sign In</button>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </form>
      <div className="signup-link">
        <p className="link">New to Insight? <a href="https://www-student.cse.buffalo.edu/CSE442-542/2024-Spring/cse-442ac/Signup/" className="link">Sign Up</a></p>
      </div>
    </main>
  );
}

export default Main;