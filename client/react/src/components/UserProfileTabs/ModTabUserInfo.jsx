import React from "react";
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';

function ModTabUserInfo() {
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/auth/getuserdata`,{
                method: 'GET',
                credentials: 'include'
            }
                
            );
            const data = await response.json();
            setUser(data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setLoading(false);
        }
        };

        fetchUserData();
    }, []);

    return ( 
        <div>
            <h2>Account</h2>
            <div className="account-tab">
                
                <div className="account-tab-element">
                    <div>
                        <span className="account-small-label">Email</span><br />
                        <span className="account-info-line">email{user?.name}</span>
                    </div>
                    <div>
                    <Button className="edit-button" variant="outlined"><i className='bx bxs-edit bx-sm' ></i>  <span className="edit-button-text">Edit</span></Button>
                    </div>
                </div>

                <div className="account-tab-element">
                    <div>
                        <span className="account-small-label">Name</span><br />
                        <span className="account-info-line">Test</span>
                    </div>
                    <div>
                    <Button className="edit-button" variant="outlined"><i className='bx bxs-edit bx-sm' ></i>  <span className="edit-button-text">Edit</span></Button>
                    </div>
                </div>

                <div className="account-tab-element">
                    <div>
                        <span className="account-small-label">Surname</span><br />
                        <span className="account-info-line">User</span>
                    </div>
                    <div>
                    <Button className="edit-button" variant="outlined"><i className='bx bxs-edit bx-sm' ></i>  <span className="edit-button-text">Edit</span></Button>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default ModTabUserInfo;