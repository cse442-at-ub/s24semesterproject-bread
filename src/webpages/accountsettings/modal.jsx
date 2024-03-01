// Modal.jsx
import React from 'react';
import './modal.css'; // Assuming you have a CSS file for modal styles

const Modal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Confirm Action</h2>
                <p>Are you sure you want to delete your account?</p>
                <button onClick={onConfirm}>Yes, Delete</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default Modal;
