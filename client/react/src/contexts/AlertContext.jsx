import React, { createContext, useContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState({
        open: false,
        message: "",
        severity: "success", // "success" | "error" | "warning" | "info"
    });

    const showAlert = (message, severity = "success") => {
        setAlert({ open: true, message, severity });
    };

    const handleClose = () => {
        setAlert({ ...alert, open: false });
    };

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}
            <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={alert.severity} sx={{ width: "100%" }}>
                    {alert.message}
                </Alert>
            </Snackbar>
        </AlertContext.Provider>
    );
};

// Custom hook to use the alert context
export const useAlert = () => useContext(AlertContext);
