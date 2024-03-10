import React from 'react';
import {Link} from 'react-router-dom';
import './Footer.css';
function Footer() {
  return (
    <footer className="footer" style={{ position: 'relative' }}>
      <Link to="/signuppage/" style={{ textDecoration: 'none' }}>
        <button style={{
          position: 'relative',
          width: 'calc(27.9vw + 27.9vh)',
          height: 'calc(4.5vw + 4.5vh)',
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
    </footer>
  );
}


export default Footer;

