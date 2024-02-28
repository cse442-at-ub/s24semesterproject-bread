import React from 'react';
import './NavBar.css'; // Make sure to create a corresponding CSS file
import Logo from "../../images/Logo.png";

function NavBar() {
    return (
      <nav style={{
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        backgroundColor: '#005bbb', 
        color: 'white', 
        padding: '0.5rem 1rem', // Reduced vertical padding
      }}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <img src={Logo} alt="Logo" style={{height: '40px', marginRight: '1rem'}} /> 
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          width: '30%', // Adjust this value based on your needs
        }}>
          <a href="#" style={{
            color: '#FFFFFF',
            fontSize: '20px',
            fontFamily: 'Crimson Text',
            fontWeight: '400',
            textDecoration: 'none',
            marginRight: '20px', // Adjust the spacing between links as needed
          }}>Help</a>
          <a href="/loginpage/" style={{
            color: '#FFFFFF',
            fontFamily: 'Crimson Text',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '20px',
            textDecoration: 'none',
            marginRight: '20px', // Adjust the spacing between links as needed

          }}>Log In</a>
          <a href="/signuppage/" style={{
            background: '#FFFFFF',
            color: '#000000',
            fontSize: '20px',
            fontFamily: 'Crimson Text',
            fontStyle: 'normal',
            fontWeight: '400',
            borderRadius: '9.26822px',
            textDecoration: 'none',
            padding: '5px 20px', // Reduced vertical padding in the "Sign Up" button
          }}>Sign Up</a>
        </div>
      </nav>
    );
}

export default NavBar;
