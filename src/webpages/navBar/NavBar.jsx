import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Ensure this CSS file is properly linked
import Logo from "../../images/Logo.png";
import MenuIcon from "../../images/menu(white).png"; // Verify the path to your image

function NavBar() {
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#005bbb',
            color: 'white',
            padding: '0.5rem 1rem',
            position: 'fixed',
            top: '0', // Ensure NavBar is at the very top
            left: '0', // Align NavBar to the left edge
            width: '100%',
            zIndex: 1000, // High z-index to ensure it stays on top of other content
        }}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <img src={Logo} alt="Logo" style={{height: '40px', marginRight: '1rem'}} />
            </div>
            <div style={{ cursor: 'pointer' }}>
                <img src={MenuIcon} alt="Menu" style={{height: '40px',marginRight: '1.5rem'}} onClick={toggleMenu} />
            </div>
            {isMenuVisible && (
                <div style={{
                    position: 'absolute',
                    top: '100%', // Position directly below the nav bar
                    right: '0',
                    backgroundColor: 'white',
                    color: '#005bbb',
                    padding: '1.5rem',
                    boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
                    zIndex: 1, // Ensure it's above other content but below the fixed navbar
                }}>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{marginBottom: '0.5rem'}}>
                            <Link to="/homepage" style={{ color: '#005bbb', textDecoration: 'none' }}>
                                Homepage
                            </Link>
                        </li>
                        <li style={{marginBottom: '0.5rem'}}>Messages</li>
                        <li style={{marginBottom: '0.5rem'}}>Saved</li>
                        <li style={{marginBottom: '0.5rem'}}>
                            <Link to="/accountSettings" style={{ color: '#005bbb', textDecoration: 'none' }}>
                                Account Settings
                            </Link>
                        </li>
                        <li style={{marginBottom: '0.5rem'}}>Logout</li>
                    </ul>
                </div>
            )}
        </nav>
    );
}

export default NavBar;
