// LoginComponent.jsx

import React, { useState } from 'react';
import eyeLogo from './eye.webp';
import signIn from './api';
import { handleEmailChange, handlePasswordChange, handleSignIn } from './authHelpers';

const mainContainerStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '20px',
  width: '407px',
  height: '600px',
  background: 'linear-gradient(to bottom, #005BBB, #FFFFFF)',
  backgroundAttachment: 'fixed',
  boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.25)',
  borderRadius: '20px',
  marginTop: '30px',
};

const titleContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const titleStyle = {
  fontFamily: 'Crimson Text',
  lineHeight: '52px',
  textAlign: 'center',
  color: '#000000',
  marginTop: '20px',
  fontStyle: 'normal',
  fontSize: '65px',
  letterSpacing: '-0.01em',
  fontWeight: 450,
};

const logoStyle = {
  width: '15%',
  marginLeft: '5px',
  display: 'inline-block',
  marginTop: '-35px',
};

const separatorStyle = {
  border: 'none',
  borderTop: '1px solid #000',
  margin: '-30px 0',
};

const subtitleStyle = {
  fontFamily: 'Crimson Text',
  fontSize: '26px',
  lineHeight: '48px',
  fontWeight: 450,
  textAlign: 'center',
  fontStyle: 'normal',
  color: '#000000',
  marginBottom: '20px',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
};

const inputStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '300px',
  height: '50px',
  marginBottom: '20px',
};

const labelStyle = {
  fontFamily: 'Crimson Text',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '24px',
  color: '#000000',
};

const textfieldStyle = {
  width: '100%',
  padding: '10px',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
  alignSelf: 'center',
};

const forgotPasswordStyle = {
  marginBottom: '10px',
};

const linkStyle = {
  fontFamily: 'Crimson Text',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '18px',
  lineHeight: '24px',
  textAlign: 'center',
  color: '#000000',
};

const spaceStyle = {
  marginBottom: '50px',
};

const extraSpaceStyle = {
  marginBottom: '20px',
};

const primaryStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '320px',
  height: '32px',
  background: '#005BBB',
  borderRadius: '8px',
  fontFamily: 'Crimson Text',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '20px',
  lineHeight: '24px',
  color: '#fff',
  marginBottom: '20px',
  border: 'none',
};

const mediaQueryStyle = {
  container: {
    maxWidth: '60%',
    maxHeight: '80%',
    marginTop: '45px',
  },
  title: {
    fontSize: '60px',
  },
  logo: {
    width: '13.5%',
    marginTop: '-30px',
  },
  separator: {
    margin: '-15px 0',
  },
  space: {
    marginBottom: '30px',
  },
  subtitle: {
    fontSize: '22px',
    marginBottom: '20px',
  },
  input: {
    maxWidth: '100%',
  },
  label: {
    fontSize: '14px',
  },
  primary: {
    fontSize: '17.5px',
    marginTop: '-15px',
    maxWidth: '100%',
    maxHeight: '100%',
    marginBottom: '0px',
  },
  link: {
    fontSize: '16.5px',
  },
};

function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <main style={mainContainerStyle}>
      <div style={titleContainerStyle}>
        <h2 style={titleStyle}>InSight</h2>
        <img style={logoStyle} src={eyeLogo} alt="Logo" />
      </div>
      <hr style={separatorStyle} />
      <div style={spaceStyle}></div>
      <h3 style={subtitleStyle}>Sign In</h3>
      <form style={formStyle}>
        <div style={inputStyle}>
          <label style={labelStyle}>Email</label>
          <input
            style={textfieldStyle}
            type="email"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value, setEmail)}
            placeholder="Enter your email"
          />
        </div>
        <div style={inputStyle}>
          <label style={labelStyle}>Password</label>
          <input
            style={textfieldStyle}
            type="password"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value, setPassword)}
            placeholder="Enter your password"
          />
        </div>
        <div style={forgotPasswordStyle}>
          <a href="#" style={linkStyle}></a>
        </div>
        <div style={extraSpaceStyle}></div>
        <button
          style={primaryStyle}
          type="button"
          onClick={() => handleSignIn(email, password, signIn, setErrorMessage)}
        >
          Sign In
        </button>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </form>
      <div className="signup-link">
        <p style={linkStyle}>
          New to Insight?{' '}
          <a
            href="https://www-student.cse.buffalo.edu/CSE442-542/2024-Spring/cse-442ac/Signup/"
            style={linkStyle}
          >
            Sign Up
          </a>
        </p>
      </div>
    </main>
  );
}

export default LoginComponent;
