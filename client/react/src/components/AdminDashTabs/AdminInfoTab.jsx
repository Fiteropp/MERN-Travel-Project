import React from "react";
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';

export default function AdminInfoTab() {
    
    
    const [loading, setLoading] = useState(true);
    const [popup, popupDisplay] = useState(false)
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [currentField, setCurrentField] = useState('');
    const [currentValue, setCurrentValue] = useState('');
    const [fields, setFields] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/auth/getuserdata`,{
                method: 'GET',
                credentials: 'include'
            }
                
            );
            const data = await response.json();
            setFields(data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setLoading(false);
        }
        };

        fetchUserData();
    }, []);

   


    const toggleBlur = () => {
        const blurEl = document.getElementById("blur");
        blurEl.classList.toggle("active");
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

            
            setFields((prevFields) => ({
                ...prevFields,
                ...updatedField, 
            }));
            alert(`${currentField} updated successfully!`);
            setIsPopupOpen(false); 
            toggleBlur()
          
        } else {
            alert('Failed to update field.');
          }
        } catch (error) {
          console.error('Error updating field:', error);
        }
      };

      const handleEditClick = (field) => {
        setCurrentField(field);
        setCurrentValue(fields[field]);
        setIsPopupOpen(true);
        toggleBlur()
      };
    
    
    const handleClose = () => {
        setIsPopupOpen(false);
        toggleBlur()
    };
    
    

    

    return ( 
        <div >
            
            <div>
                {isPopupOpen && 
                <div className="edit-popup" id='popupEl'>
                    <h2>Edit {currentField}</h2>
                    <input className="edit-input" type="text" id="field-input" placeholder="Enter new value" value={currentValue} onChange={(e) => setCurrentValue(e.target.value)} />
                    <Button variant="outlined" onClick={handleClose}>Close</Button>
                    <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                </div>}
            </div>
        
        <div id='blur'>
        <h2>Account</h2>
            <div className="account-tab">
                
                <div className="account-tab-element">
                    <div>
                        <span className="account-small-label">Email</span><br />
                        <span className="account-info-line">{fields.email || 'N/A'}</span>
                    </div>
                    <div>
                    <Button onClick={() => handleEditClick('email')} className="edit-button" variant="outlined"><i className='bx bxs-edit bx-sm' ></i>  <span className="edit-button-text">Edit</span></Button>
                    </div>
                </div>

                <div className="account-tab-element">
                    <div>
                        <span className="account-small-label">Full Name</span><br />
                        <span className="account-info-line">{fields.name || 'N/A'}</span>
                    </div>
                    <div>
                    <Button onClick={() => handleEditClick('fullName')} className="edit-button" variant="outlined"><i className='bx bxs-edit bx-sm' ></i>  <span className="edit-button-text">Edit</span></Button>
                    </div>
                </div>

                <div className="account-tab-element">
                    <div>
                        <span className="account-small-label">Phone Number</span><br />
                        <span className="account-info-line">{fields.phone || 'N/A'}</span>
                    </div>
                    <div>
                    <Button onClick={() => handleEditClick('phone')} className="edit-button" variant="outlined"><i className='bx bxs-edit bx-sm' ></i>  <span className="edit-button-text">Edit</span></Button>
                    </div>
                </div>
                
                <div className="account-tab-element">
                    <div>
                        <span className="account-small-label">Profile Picture</span><br />
                        <span className="account-info-line"></span>
                    </div>
                    <div>
                    <Button onClick={() => handleEditClick('img')} className="edit-button" variant="outlined"><i className='bx bxs-edit bx-sm' ></i>  <span className="edit-button-text">Edit</span></Button>
                    </div>
                </div>
            </div>
        </div>
            
        </div>
     );
}