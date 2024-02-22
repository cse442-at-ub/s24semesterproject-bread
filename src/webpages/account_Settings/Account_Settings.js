// Assuming the file path might be changed to src/webpages/accountSettings/AccountSettings.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Account_Settings.css'; // Make sure this file is renamed to AccountSettings.css if the component is renamed
import Logo from "/Users/jiewen/Documents/GitHub/s24semesterproject-bread/src/images/Logo.png";
import MenuIcon_White from "/Users/jiewen/Documents/GitHub/s24semesterproject-bread/src/images/menu(white).png";

const AccountSettings = () => {
    const navigate = useNavigate();

    const handleMenuClick = () => {
        navigate('/accountSettings');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would handle the submission of the form
    };

    return (
        <div>
            <div className="header-bar">
                <img src={Logo} alt="InSight Logo" className="logo" />
                <img src={MenuIcon_White} alt="Menu" className="menu-icon" onClick={handleMenuClick} />
            </div>
            <form className="account-settings-form" onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" defaultValue="Bot" />
                <input type="password" placeholder="Current Password" />
                <input type="password" placeholder="New Password" />
                <input type="password" placeholder="Confirm Password" />
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default AccountSettings;
