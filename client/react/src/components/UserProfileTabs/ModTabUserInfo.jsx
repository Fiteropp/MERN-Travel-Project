import React from "react";
import { useEffect, useState } from 'react';
import { useUser } from "../../contexts/UserContext";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Slide } from "@mui/material";

import { useAlert } from "../../contexts/AlertContext";

const Transition = Slide;


export default function ModTabUserInfo() {
    const { user, setUser, loading, fetchUserData } = useUser();
    const [open, setOpen] = useState(false);
    const [currentField, setCurrentField] = useState('');
    const [currentValue, setCurrentValue] = useState('');
    const { showAlert } = useAlert();

    // Prevent rendering if user is null and loading is false (meaning no user data fetched yet)
    if (loading) return <p>Loading...</p>;
    if (!user) return <p>No user data available</p>;

    const handleEditClick = (field) => {
        setCurrentField(field);
        setCurrentValue(user?.[field] || '');
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async () => {
        const payload = {
            [currentField]: currentValue,
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/auth/edituserdata`, {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const updatedField = await response.json();

                // Update global user context
                setUser((prevUser) => ({
                    ...prevUser,
                    ...updatedField,
                }));

                setOpen(false);
                await fetchUserData();
                showAlert("UserData Updated", "success");
            } else {
                alert("Failed to update field.");
            }
        } catch (error) {
            console.error("Error updating field:", error);
        }
    };

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                maxWidth="xs"
                fullWidth={true}
            >
                <DialogTitle>{`Edit ${currentField}`}</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label={`New ${currentField}`}
                        variant="outlined"
                        value={currentValue}
                        onChange={(e) => setCurrentValue(e.target.value)}
                        sx={{ marginTop: "1em", marginBottom: "1em" }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose} className="edit-button">
                        Close
                    </Button>
                    <Button variant="contained" onClick={handleSubmit} className="edit-button-contained">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            <h2>Account</h2>
            <div className="account-tab">
                <div className="account-tab-element">
                    <div>
                        <span className="account-small-label">Email</span><br />
                        <span className="account-info-line">{user?.email || "N/A"}</span>
                    </div>
                    <Button onClick={() => handleEditClick("email")} className="edit-button" variant="outlined">
                        <i className="bx bxs-edit bx-sm"></i> <span className="edit-button-text">Edit</span>
                    </Button>
                </div>

                <div className="account-tab-element">
                    <div>
                        <span className="account-small-label">Full Name</span><br />
                        <span className="account-info-line">{user?.fullName || "N/A"}</span>
                    </div>
                    <Button onClick={() => handleEditClick("fullName")} className="edit-button" variant="outlined">
                        <i className="bx bxs-edit bx-sm"></i> <span className="edit-button-text">Edit</span>
                    </Button>
                </div>

                <div className="account-tab-element">
                    <div>
                        <span className="account-small-label">Phone Number</span><br />
                        <span className="account-info-line">{user?.phone || "N/A"}</span>
                    </div>
                    <Button onClick={() => handleEditClick("phone")} className="edit-button" variant="outlined">
                        <i className="bx bxs-edit bx-sm"></i> <span className="edit-button-text">Edit</span>
                    </Button>
                </div>

                <div className="account-tab-element">
                    <div>
                        <span className="account-small-label">Profile Picture</span><br />
                        <span className="account-info-line">{user?.img ? <img src={user.img} alt="Profile" width="50" /> : "N/A"}</span>
                    </div>
                    <Button onClick={() => handleEditClick("img")} className="edit-button" variant="outlined">
                        <i className="bx bxs-edit bx-sm"></i> <span className="edit-button-text">Edit</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}