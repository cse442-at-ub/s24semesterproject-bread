import React, { useState } from 'react';
import './NavBar.css'; // Ensure this CSS file is properly linked
import Logo from "../../images/Logo.png";
import MenuIcon from "../../images/menu(white).png"; // Verify the path to your image
import { Link } from 'react-router-dom'; // Import Link

function NavBar() {
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
        console.log("Menu visibility toggled:", isMenuVisible); // Debug: Check menu toggle
    };

    const handleLogout = async () => {
        console.log("Initiating logout process"); // Debug: Initiate logout

        const apiUrl = 'https://www-student.cse.buffalo.edu/CSE442-542/2024-Spring/cse-442ac/backend/logout/logout.php'; 
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    
        const email = localStorage.getItem('email');
        const sessionID = localStorage.getItem('sessionID');
        const userID = localStorage.getItem('userID');
        console.log("Retrieved session data:", { email, sessionID, userID }); // Debug: Check retrieved session data
    
        if (email && sessionID && userID) {
            console.log("Session data exists. Proceeding with logout."); // Debug: Session data check
            try {
                const response = await fetch(proxyUrl + apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, sessionID, userID, action: 'logout'}),
                });
                console.log("Raw response:", response); 
    
                if (response.ok) {
                    const data = await response.json();
                    console.log("Logout response:", data); // Debug: Check logout response
                    console.log("Logout successful:", data.message); // Debug: Successful logout
                    localStorage.removeItem('email');
                    localStorage.removeItem('sessionID');
                    localStorage.removeItem('userID');
                    console.log("deleted"); // Debug: Initiate logout

                    window.location.href = '/signinpage'; // Redirect after logout
                } else {
                    console.error("Logout failed with status:", response.status, response.statusText);
                }
            } catch (error) {
                console.error('Logout error caught:', error); // Debug: Catch logout error
            }
        } else {
            console.log("No active session found. Redirecting to login page."); // Debug: No session data
            window.location.href = '/signin'; // Redirect if no session
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
                    zIndex: 1
                }}>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{marginBottom: '0.5rem'}}>
                            <Link to="/homepage" style={{ color: '#005bbb', textDecoration: 'none' }}>
                                Homepage
                            </Link>
                        </li>
                        <li style={{marginBottom: '0.5rem'}}>
                            <Link to="/quizPage" style={{ color: '#005bbb', textDecoration: 'none' }}>
                                Quiz
                            </Link>
                        </li>

                        <li style={{marginBottom: '0.5rem'}}>Messages</li>
                        <li style={{marginBottom: '0.5rem'}}>Saved</li>
                        <li style={{marginBottom: '0.5rem'}}>
                            <Link to="/accountsettings" style={{ color: '#005bbb', textDecoration: 'none' }}>
                                Account Settings
                            </Link>
                        </li>
                        <li style={{marginBottom: '0.5rem'}}>
                            <button onClick={handleLogout} style={{ color: '#005bbb', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
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
