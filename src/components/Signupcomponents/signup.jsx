import React, { useState } from 'react';
import './signup.css'; 
import eyeLogo from './Logo.png';
import signUp from '../../SignUpLink.jsx';
import { Link,useNavigate } from 'react-router-dom';

function Main() {
  const navigate= useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!email.endsWith('buffalo.edu')) {
      alert("Please use a buffalo.edu email address to sign up");
      return;
    }

    try {
      const responseData = await signUp(email, username, password, confirmPassword);
      console.log('Response data:', responseData);

      if (responseData.includes("User registered successfully") || responseData.includes("Email sent successfully")) {
        // Use relative path for navigation
        navigate('/signinpage');
      } else {
        alert(responseData);
      }
    } catch (error) {
      console.error('Error:', error);
      alert("The user name is already been used.");
    }
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
              <input className="textfield" type="email" placeholder="Enter your email" onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="input">
              <label className="label">Username</label>
              <input className="textfield" type="text" placeholder="Enter your username" onChange={e => setUsername(e.target.value)} />
            </div>
            <div className="input">
              <label className="label">Password</label>
              <input className="textfield" type="password" placeholder="Enter your password" onChange={e => setPassword(e.target.value)} />
            </div>
            <div className="input">
              <label className="label">Confirm Password</label>
              <input className="textfield" type="password" placeholder="Re-enter your password" onChange={e => setConfirmPassword(e.target.value)} />
            </div>
            <div className="extra-space"></div>
            <button className="primary" type="button" onClick={handleSignUp}>Sign Up</button>
          </form>
          <div className="signup-link">
            <div className="link-container">
              <p className="link">Already on InSight? <Link to="/signinpage" className="link">Sign In</Link></p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Main;
