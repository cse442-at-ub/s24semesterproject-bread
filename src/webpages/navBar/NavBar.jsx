import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Ensure this CSS file is properly linked
import Logo from "../../images/Logo.png";
import MenuIcon from "../../images/menu(white).png"; // Verify the path to your image

function NavBar() {
    // State to manage the dropdown menu's visibility
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    // Function to toggle the dropdown menu
    const toggleMenu = () => {
        //alert("Toggling menu"); // Debugging statement

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
        }}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <img src={Logo} alt="Logo" style={{height: '40px', marginRight: '1rem'}} />
            </div>
            {/* Menu Icon with onClick event */}
            <div style={{ cursor: 'pointer', marginTop: '5px' }}>
                <img src={MenuIcon} alt="Menu" style={{height: '40px'}} onClick={toggleMenu} />
            </div>
            {/* Dropdown Menu */}
            {isMenuVisible && (
                <div style={{
                    position: 'absolute',
                    top: '100%', // Position directly below the nav bar
                    right: '0',
                    backgroundColor: 'white',
                    color: '#005bbb',
                    padding: '1rem',
                    boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
                    zIndex: 1, // Ensure it's above other content
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
