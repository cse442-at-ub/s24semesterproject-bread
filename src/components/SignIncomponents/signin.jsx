import React, { useState } from 'react';
import './signin.css'; 
import eyeLogo from './Logo.png';

function Main() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const data = {
      action: 'login',
      email: email,
      password: password
    };

    fetch('https://cors-anywhere.herokuapp.com/https://www-student.cse.buffalo.edu/CSE442-542/2024-Spring/cse-442ac/backend/login/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to login');
      }
    })
    .then(data => {
      // Check if the response contains expected data
      if (data.email && data.sessionID && data.userID) {
        // Redirect to '/home' page
        window.location.href = '/homepage/';
      } else {
        // Handle unexpected response
        throw new Error('Invalid response data');
      }
    })
    .catch(error => {
      // Handle login error
      console.error('Login error:', error);
    });
  }    

  return (
    <div className="main-container">
      <div className="bg">
        <main className="container">
          <div className="title-container">
            <img className="title" src={eyeLogo} alt="Logo" />
          </div>
          <hr className="separator" />
          <div className="space"></div>
          <h3 className="subtitle">Sign In</h3>
          <form className="form">
            <div className="input">
              <label className="label">Email</label>
              <input className="textfield" type="email" placeholder="Enter your email" onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="input">
              <label className="label">Password</label>
              <input className="textfield" type="password"  placeholder="Enter your password" onChange={e => setPassword(e.target.value)} />
            </div>
            <div className="forgot-password">
              <a href="#" className="link"></a>
            </div>
            <div className="extra-space"></div>
            <button className="primary" type="button" onClick={handleLogin}>Sign In</button>
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
