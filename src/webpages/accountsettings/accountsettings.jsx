import React, { useState } from 'react';
import NavBar from '../navBar/NavBar';
import './accountsettings.css'; // Ensure this path is correct
import defaultProfilePic from "../../images/eye.png";

const AccountSettingsPage = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [major, setMajor] = useState('');
    const [graduationYear, setGraduationYear] = useState('');
    const [name, setName] = useState('');
    const [coursesTaken, setCoursesTaken] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');


    const handleProfilePicChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setProfilePic(fileUrl);
        }
    };

    return (
        <div className="main-container">
            <NavBar />
            <div className="left-side">
                <div className="profile-pic-container">
                    <label htmlFor="profile-upload" style={{ cursor: 'pointer' }}>
                        <img src={profilePic || defaultProfilePic} alt="Profile" className="profile-image" />
                        <input
                            id="profile-upload"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleProfilePicChange}
                        />
                    </label>
                </div>
                <div className="field-container">
                    <input
                        type="text"
                        placeholder="Major"
                        value={major}
                        onChange={(e) => setMajor(e.target.value)}
                        className="text-field"
                    />
                    <input
                        type="text"
                        placeholder="Graduation Year"
                        value={graduationYear}
                        onChange={(e) => setGraduationYear(e.target.value)}
                        className="text-field"
                    />
                </div>
            </div>
            <div className="right-side">
                <div className='field-group'>
                    <label className="field-label">Name:</label>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="text-field"
                    />
                </div>

                <div className='field-group'>
                    <label className="field-label">Courses Taken:</label>
                    <input
                        type="text"
                        placeholder="Courses Taken"
                        value={coursesTaken}
                        onChange={(e) => setCoursesTaken(e.target.value)}
                        className="text-field"
                    />
                </div>

                <hr className="divider" />

                <div className='field-group'>
                    <label className="field-label">Current Password:</label>
                    <input
                        type="password"
                        placeholder="Current Password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="text-field"
                    />
                </div>

                <div className='field-group'>
                    <label className="field-label">New Password:</label>
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="text-field"
                    />
                </div>
                


                <div className="button-container">
                    <button className="save-button">Save Changes</button> {/* Save button now inside a container */}
                </div>
            </div>
        </div>
    );
};

export default AccountSettingsPage;
