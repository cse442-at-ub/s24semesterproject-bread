import React, { useState } from 'react';
import NavBar from '../navBar/NavBar';
import './Account_Settings.css'; // Ensure this path is correct

const AccountSettingsPage = () => {
    const [profilePic, setProfilePic] = useState(null);

    const handleProfilePicChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setProfilePic(fileUrl);
        }
    };

    return (
        <div className="account-settings-container">
            <NavBar />
            <div className="profile-upload-container">
                <label htmlFor="profile-upload">
                    <img src={profilePic || "../../images/eye.png"} alt="Profile" className="profile-image" />
                    <input
                        id="profile-upload"
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleProfilePicChange}
                    />
                </label>
            </div>
        </div>
    );
};

export default AccountSettingsPage;
