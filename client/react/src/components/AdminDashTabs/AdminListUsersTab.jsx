import React from "react";
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Grid2 } from "@mui/material";
import Box from '@mui/material/Box';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import './../../styles/AdminDash.css';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function AdminListUsers() {

    const [users, setUsers] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [role, setRole] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
           const LoadUsers = async () => {
           try {
               const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/admin/listallusers`,{
                   method: 'GET',
                   credentials: 'include'
               }
                   
               );
               const data = await response.json();
               setUsers(data);
           } catch (error) {
               console.error("Error fetching user data:", error);
           }
           };
   
           LoadUsers();
       }, []);

    const EditUser = async (UserID) => {
        
        try {
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/admin/edituser/${UserID}`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(role),
          });
    
          
        } catch (error) {
          console.error('Error updating field:', error);
        }
      };

    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    const handleChange = (event) => {
        setRole(event.target.value);
      };


    return(
        <div>
            <h2>All Users</h2>
            
            {users.length > 0 ? (
        users.map((users) => (
            <Box key={users._id} sx={{ flexGrow: 1, width: '100%' }} >
                <Grid2 container spacing={1} columns={12} sx={{width: '100%'}} className="listUsersElementContainer">
                    <Grid2 size="grow">
                        <h3 id="UsersElementText">{users.fullName || 'N/A'}</h3>
                    </Grid2>

                    <Grid2 size="grow" className="listUsersElementColumnContainer">
                        <h4 id="UsersElementText">{users.roles?.map(role => capitalize(role.name)) || 'N/A'}</h4>
                    </Grid2>

                    <Grid2 size="grow" className="listUsersButtonContainer">
                        <div>
                            <Button className="edit-button" variant="outlined" onClick={handleClickOpen}>
                                <i className="bx bxs-edit bx-sm"></i> <span className="edit-button-text">Edit</span>
                            </Button>

                            
                        </div>
                    </Grid2>
                </Grid2>
            
            </Box>
        ))
      ) : (
        <p>No Users Found.</p>
      )}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth= 'xs'
        fullWidth= 'true'
    >
        <DialogTitle>{"Edit User Roles"}</DialogTitle>
        <DialogContent>
            <FormControl fullWidth sx={{marginTop: '1em', marginBottom: '1em'}}>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Role"
                value={role}
                onChange={handleChange}
                >
                <MenuItem value="672677be606bf915815ca89b">User</MenuItem>
                <MenuItem value="672677be606bf915815ca89d">Moderator</MenuItem>
                </Select>
            </FormControl>
        </DialogContent>
        <DialogActions>
            <Button variant="outlined" onClick={handleClose}>Close</Button>
            <Button variant="contained" onClick={() => EditUser(users._id)}>Confirm</Button>
        </DialogActions>
    </Dialog>
        </div>
    )

} 