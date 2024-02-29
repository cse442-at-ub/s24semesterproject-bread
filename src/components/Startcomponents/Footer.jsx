import React from 'react';

function Footer() {
  return (
    <footer className="footer" style={{ position: 'relative' }}>
      <p>&copy; 2024 My Website. All Rights Reserved.</p>
      <a href="https://www-student.cse.buffalo.edu/CSE442-542/2024-Spring/cse-442ac/Signup/" style={{ textDecoration: 'none' }}>
        <button style={{
          position: 'absolute',
          width: '392px',
          height: '63px',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          background: '#005BBB',
          borderRadius: '15.5633px',
          border: 'none',
          color: '#FFFFFF',
          fontFamily: 'Crimson Text',
          fontStyle: 'normal',
          fontWeight: '600',
          fontSize: '35px', /* Adjust font size */
          lineHeight: '63px', /* Adjust line height */
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center', /* Center horizontally */
          textAlign: 'center'
        }}>
          Sign up now!
        </button>
      </a>
    </footer>
  );
}

export default Footer;

