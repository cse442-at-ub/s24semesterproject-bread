import React, { useState } from 'react';
import './signup.css'; 
import eyeLogo from './Logo.png';
import { Link, useNavigate } from 'react-router-dom';

const apiUrl = 'https://www-student.cse.buffalo.edu/CSE442-542/2024-Spring/cse-442ac/backend/register/register.php';
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

const Main = () => {
  const navigate = useNavigate();
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
    const webServerUrl = process.env.REACT_APP_WEB_SERVER_URL
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    

 
    try {
      const response = await fetch(`${apiUrl}/backend/register/register.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
          confirmPassword: confirmPassword,
          action: 'register',
        }),
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(String(responseData.message));
      } else {
        navigate('/signinpage');
      }
    } catch (error) {
      alert(error.message);
    }
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
