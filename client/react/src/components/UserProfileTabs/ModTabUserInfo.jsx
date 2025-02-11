import React from "react";
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useUser } from "../../contexts/UserContext";

export default function ModTabUserInfo() {
    const { user, setUser, loading } = useUser();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [currentField, setCurrentField] = useState('');
    const [currentValue, setCurrentValue] = useState('');

    const toggleBlur = () => {
        const blurEl = document.getElementById("blur");
        blurEl?.classList.toggle("active");
    };

    const handleSubmit = async () => {
        const payload = {
            [currentField]: currentValue,
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/auth/edituserdata`, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const updatedField = await response.json();

                // Update global user context
                setUser((prevUser) => ({
                    ...prevUser,
                    ...updatedField,
                }));

                alert(`${currentField} updated successfully!`);
                setIsPopupOpen(false);
                toggleBlur();
            } else {
                alert('Failed to update field.');
            }
        } catch (error) {
            console.error('Error updating field:', error);
        }
    };

    const handleEditClick = (field) => {
        setCurrentField(field);
        setCurrentValue(user?.[field] || '');  // Read from user context
        setIsPopupOpen(true);
        toggleBlur();
    };

    const handleClose = () => {
        setIsPopupOpen(false);
        toggleBlur();
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            {isPopupOpen && (
                <div className="edit-popup" id="popupEl">
                    <h2>Edit {currentField}</h2>
                    <input
                        className="edit-input"
                        type="text"
                        id="field-input"
                        placeholder="Enter new value"
                        value={currentValue}
                        onChange={(e) => setCurrentValue(e.target.value)}
                    />
                    <Button variant="outlined" onClick={handleClose}>Close</Button>
                    <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                </div>
            )}

            <div id="blur">
                <h2>Account</h2>
                <div className="account-tab">
                    <div className="account-tab-element">
                        <div>
                            <span className="account-small-label">Email</span><br />
                            <span className="account-info-line">{user?.email || 'N/A'}</span>
                        </div>
                        <Button onClick={() => handleEditClick('email')} className="edit-button" variant="outlined">
                            <i className="bx bxs-edit bx-sm"></i> <span className="edit-button-text">Edit</span>
                        </Button>
                    </div>

                    <div className="account-tab-element">
                        <div>
                            <span className="account-small-label">Full Name</span><br />
                            <span className="account-info-line">{user?.fullName || 'N/A'}</span>
                        </div>
                        <Button onClick={() => handleEditClick('fullName')} className="edit-button" variant="outlined">
                            <i className="bx bxs-edit bx-sm"></i> <span className="edit-button-text">Edit</span>
                        </Button>
                    </div>

                    <div className="account-tab-element">
                        <div>
                            <span className="account-small-label">Phone Number</span><br />
                            <span className="account-info-line">{user?.phone || 'N/A'}</span>
                        </div>
                        <Button onClick={() => handleEditClick('phone')} className="edit-button" variant="outlined">
                            <i className="bx bxs-edit bx-sm"></i> <span className="edit-button-text">Edit</span>
                        </Button>
                    </div>

                    <div className="account-tab-element">
                        <div>
                            <span className="account-small-label">Profile Picture</span><br />
                            <span className="account-info-line">{user?.img ? <img src={user.img} alt="Profile" width="50" /> : 'N/A'}</span>
                        </div>
                        <Button onClick={() => handleEditClick('img')} className="edit-button" variant="outlined">
                            <i className="bx bxs-edit bx-sm"></i> <span className="edit-button-text">Edit</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}