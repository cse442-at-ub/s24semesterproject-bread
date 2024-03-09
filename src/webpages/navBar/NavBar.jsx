import React, { useState } from 'react';
import './NavBar.css'; // Ensure this CSS file is properly linked
import Logo from "../../images/Logo.png";
import MenuIcon from "../../images/menu(white).png"; // Verify the path to your image

function NavBar() {
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    const handleLogout = async () => {
        const logoutUrl = '../../../backend/logout/logout.php'; // Update with your actual URL

        // Retrieve session data from local storage
        const email = localStorage.getItem('email');
        const sessionID = localStorage.getItem('sessionID');
        const userID = localStorage.getItem('userID');

        if (email && sessionID && userID) {
            try {
                const response = await fetch(logoutUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, sessionID, userID }),
                });

                const data = await response.json(); // Assuming your logout.php returns JSON

                if (response.ok) {
                    console.log(data.message);
                    // Clear session data from local storage
                    localStorage.removeItem('email');
                    localStorage.removeItem('sessionID');
                    localStorage.removeItem('userID');
                    // Redirect the user or update the UI as needed
                    window.location.href = '/signinpage'; // Use window.location.href for redirection
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Logout error:', error);
            }
        } else {
            console.log("No active session found. Redirecting to login page.");
            window.location.href = '/signinpage'; // Use window.location.href for redirection
        }
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
            top: '0',
            left: '0',
            width: '100%',
            zIndex: 1000,
        }}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <img src={Logo} alt="Logo" style={{height: '40px', marginRight: '1rem'}} />
            </div>
            <div style={{ cursor: 'pointer' }}>
                <img src={MenuIcon} alt="Menu" style={{height: '40px', marginRight: '1.5rem'}} onClick={toggleMenu} />
            </div>
            {isMenuVisible && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: '0',
                    backgroundColor: 'white',
                    color: '#005bbb',
                    padding: '1.5rem',
                    boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
                    zIndex: 1,
                }}>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{marginBottom: '0.5rem'}}>
                            <a href="/homepage" style={{ color: '#005bbb', textDecoration: 'none' }}>
                                Homepage
                            </a>
                        </li>
                        <li style={{marginBottom: '0.5rem'}}>Messages</li>
                        <li style={{marginBottom: '0.5rem'}}>Saved</li>
                        <li style={{marginBottom: '0.5rem'}}>
                            <a href="/accountsettings" style={{ color: '#005bbb', textDecoration: 'none' }}>
                                Account Settings
                            </a>
                        </li>
                        <li style={{marginBottom: '0.5rem'}}>
                            <button onClick={handleLogout} style={{ color: '#005bbb', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}

export default NavBar;
