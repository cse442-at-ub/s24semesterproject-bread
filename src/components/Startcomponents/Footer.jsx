import React from 'react';
import {Link} from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer" style={{ position: 'relative' }}>
      <Link to="/signuppage/" style={{ textDecoration: 'none' }}>
        <button style={{
          position: 'relative',
          width: 'calc(24.8vw + 24.8vh)',
          height: 'calc(4vw + 4vh)',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: '#005BBB',
          borderRadius: '15.5633px',
          border: 'none',
          color: '#FFFFFF',
          fontFamily: 'Crimson Text',
          fontStyle: 'normal',
          fontWeight: '600',
          fontSize: 'calc(2.5vw + 2.5vh)', /* Adjust font size */
          lineHeight: '63px', /* Adjust line height */
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center', /* Center horizontally */
          textAlign: 'center'
        }}>
          Sign up now!
        </button>
      </Link>
      <p style={{
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        right: '40%', /* Adjust position */
        fontSize: 'calc(1.0vw + 1.0vh)', /* Adjust font size */
        color: '#000' /* Adjust color */,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', /* Center horizontally */
        textAlign: 'center'
      }}>
        <Link to="/homepage/" style={{ textDecoration: 'none' }}> Access the website as a Guest</Link>
      </p>
    </footer>
  );
}

export default Footer;
