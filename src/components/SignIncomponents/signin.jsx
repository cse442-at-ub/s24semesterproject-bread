//'https://cors-anywhere.herokuapp.com/https://www-student.cse.buffalo.edu/CSE442-542/2024-Spring/cse-442ac/backend/login/login.php'

import React, { useState } from 'react';
import './signin.css'; 
import eyeLogo from './Logo.png';
import { Link,useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext'; // Import useAuth hook

function Main() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { checkAuth } = useAuth();
  const { setIsAuthenticated } = useAuth();
  const navigate= useNavigate();

  const handleLogin = () => {
    // Check if the email ends with 'buffalo.edu'
    if (!email.endsWith('buffalo.edu')) {
      alert('Please use an email ending with buffalo.edu');
      return;
    }

    const data = {
      action: 'login',
      email: email,
      password: password
    };

    const webServerUrl = process.env.REACT_APP_WEB_SERVER_URL
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    
    fetch(`${apiUrl}/backend/login/login.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
        // localStorage.setItem('userData', JSON.stringify(data));
        localStorage.setItem('email', data.email);
        localStorage.setItem('sessionID', data.sessionID);
        localStorage.setItem('userID', data.userID);
        // Redirect to '/home' page
        // checkAuth();
        setIsAuthenticated(true);

        navigate('/homepage');
      } else {
        // Handle unexpected response
        throw new Error('Invalid response data');
      }
    })
    .catch(error => {
      // Handle login error
      console.error('Login error:', error);
      // Show error message in a popup
      alert('Please check your email and password input');
    });
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
            <p className="link">New to Insight? <Link to="/signuppage" className="link">Sign Up</Link></p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Main;
