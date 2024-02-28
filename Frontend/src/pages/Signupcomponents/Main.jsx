// Main.js
import React, { useState } from 'react';
import eyeLogo from './eye.webp';
import signIn from './api';
import { handleEmailChange, handlePasswordChange, handleSignIn } from './authHelpers';

const mainStyles = `
  body {
    margin: 0;
    padding: 0;
    background: linear-gradient(to bottom, #005BBB, #FFFFFF);
    background-attachment: fixed; 
  }

  .container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    width: 407px;
    height: 600px;
    background: #FFFFFF;
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    margin-top: 0px; 
  }

  .title-container {
    display: flex;
    align-items: center; 
    justify-content: center; 
  }

  .title {
    font-family: 'Crimson Text';
    line-height: 52px;
    text-align: center;
    color: #000000;
    margin-top: 20px; 
    font-style: normal;
    font-size: 65px; 
    line-height: 100%;
    letter-spacing: -0.01em;
    color: #282A3A;
    font-weight: 450;
  }

  .logo {
    width: 18%; 
    margin-left: 5px; 
    display: inline-block;
    margin-top: -30px; 
  }

  .separator {
    border: none;
    border-top: 1px solid #000; 
    margin: -30px 0;
  }

  .subtitle {
    font-family: 'Crimson Text';
    font-size: 26px;
    line-height: 48px;
    font-weight: 450;
    text-align: center;
    font-style: normal;
    color: #000000;
    margin-bottom: 20px; 
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .input {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 300px;
    height: 50px;
    margin-bottom: 20px;
  }

  .label {
    font-family: 'Crimson Text';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #000000;
  }

  .textfield {
    width: 100%;
    padding: 10px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    align-self: center;
  }

  .forgot-password {
    margin-bottom: 10px;
  }

  .link {
    font-family: 'Crimson Text';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    color: #000000;
  }
  .space {
    margin-bottom: 50px; 
  }
  .extra-space {
    margin-bottom: 20px; 
  }
  .primary {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 320px;
    height: 32px;
    background: #005BBB;
    border-radius: 8px;
    font-family: 'Crimson Text';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    color: #fff;
    margin-bottom: 20px; 
    border: none
  }



  @media screen and (max-width: 768px) {


    .container {
      max-width: 62%;
    }

    .title {
      font-family: 'Crimson Text';
      line-height: 52px;
      text-align: center;
      color: #000000;
      margin-top: 20px; 
      font-style: normal;
      font-size: 45px; 
      line-height: 100%;
      letter-spacing: -0.01em;
      color: #282A3A;
      margin-left: (-23 *62%)px;
      font-weight: 450;
    }

    .logo {
      width: 15%; 
      margin-left: 5px; 
      display: inline-block;
      margin-top: -15px; 
    }

    .separator {
      border: none;
      border-top: 1px solid #000; 
      margin: -25px 0;
    }

    .subtitle {
      font-family: 'Crimson Text';
      font-size: 22px;
      line-height: 48px;
      font-weight: 450;
      text-align: center;
      font-style: normal;
      color: #000000;
      margin-bottom: 20px; 
    }


    .input {
      max-width: 80%;
      max-height: 62%;
    }


    .textfield {
      width: calc(100% - 20px); 
    }

    .primary{
      max-width: 62%;
      max-height: 62%;
    }
  }


  @media screen and (max-height: 660px){


    .container {
      max-height: 80%;
    }

    .title {
      font-family: 'Crimson Text';
      line-height: 52px;
      text-align: center;
      color: #000000;
      margin-top: 20px; 
      font-style: normal;
      font-size: 45px; 
      line-height: 100%;
      letter-spacing: -0.01em;
      color: #282A3A;
      margin-left: (-23 *62%)px;
      font-weight: 450;
      margin-top: 0px; 
    }

    .logo {
      width: 12%; 
      margin-left: 5px; 
      display: inline-block;
      margin-top: -35px; 
    }

    .separator {
      border: none;
      border-top: 1px solid #000; 
      margin: -25x 0;
      margin-bottom: -40px; 
    }

    .subtitle {
      font-family: 'Crimson Text';
      font-size: 18px;
      line-height: 48px;
      font-weight: 450;
      text-align: center;
      font-style: normal;
      color: #000000;
      margin-bottom: -10px; 
    }

    .label{
      font-size: 12px;
    }
    .input {
      max-width: 80%;
      max-height: 50%;
    }

    .textfield {
      width: calc(100% - 20px); 

    }

    .primary{
      margin-top: -15px; 
      font-size: 12px;
      max-width: 62%;
      max-height: 62%;
      margin-bottom: 0px; 
    }
    .link{
      font-size: 12px;
    }
  }
`;

function Main() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <>
      <style>{mainStyles}</style>
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
          <p className="link">New to Insight? <a href="https://www-student.cse.buffalo.edu/CSE442-542/2024-Spring/cse-442ac/Signup/" className="link">Sign Up</a></p>
        </div>
      </main>
    </>
  );
}

export default Main;
