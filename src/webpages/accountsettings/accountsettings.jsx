import React, { useState } from 'react';
import NavBar from '../navBar/NavBar';
import './accountsettings.css'; // Ensure this path is correct
import defaultProfilePic from "../../images/eye.png";
import { useNavigate } from 'react-router-dom';

const AccountSettingsPage = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [major, setMajor] = useState('');
    const [graduationYear, setGraduationYear] = useState('');
    const [name, setName] = useState('');
    const [coursesTaken, setCoursesTaken] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const quizResult = localStorage.getItem('quizResult') || 'No quiz result yet';

    const handleProfilePicChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setProfilePic(fileUrl);
        }
    };

    const handleDeleteAccount = () => {
        setIsModalOpen(true);
    };


    
    const navigate = useNavigate(); // Initialize useNavigate



    const handleConfirmDelete = () => {
        setIsModalOpen(false);
        console.log('Account deleted'); // Replace with actual deletion logic
        navigate('/signuppage'); // Navigate to the sign-up page
    };


    // Simple Modal Component
    const SimpleModal = ({ isOpen, onClose, onConfirm }) => {
        if (!isOpen) return null;

        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    <h2>Are you sure you want to delete your account?</h2>
                    <div className="modal-actions">
                        <button onClick={onConfirm} className="modal-button confirm">Yes</button>
                        <button onClick={onClose} className="modal-button cancel">No</button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="main-container">
            <NavBar />
            <div className="left-side">
                <div className="profile-pic-container">
                    <label htmlFor="profile-upload" style={{ cursor: 'pointer' }}>
                        <img src={profilePic || defaultProfilePic} alt="Profile" className="profile-image" />
                        <div className="upload-text">Upload a picture</div>
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
                    <label  className="text-field">Quiz Result: {quizResult}</label>
                </div>
                <div className="delete-account-container">
                    <button className="delete-account-button" onClick={handleDeleteAccount}>
                        Delete Account
                    </button>
                </div>
                
            </div>
        <SimpleModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleConfirmDelete}
                />
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

                <div className='field-group'>
                    <label className="field-label">Confirm New Password:</label>
                    <input
                        type="password"
                        placeholder="Confirm New Password"
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
