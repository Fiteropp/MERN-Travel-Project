import React from 'react';
import '../styles/ModDash.css';
import { useEffect, useState } from 'react';
import { useUser } from "../contexts/UserContext";

import UserTabs from '../components/UserTabs';



function UserDash() {

    const { user, setUser, loading } = useUser();

    return (
        <div className='main-container' >
            <div className='header-section'>
                    <img className='wide-header-image' src="https://images.pexels.com/photos/2832061/pexels-photo-2832061.jpeg" alt="" />
                
                    <div className='profile-card'>
                        
                        <div className='profile-pic-frame'>
                            <img  src={ user?.img || "https://cdn-icons-png.flaticon.com/512/9385/9385289.png"} alt="" className='card' />
                        </div>
                        
                        <div className='profile-card-info'>
                            <h3 className='card-username'>User</h3>
                            <p className='card-user-email'>{user?.email}</p>
                        </div>
                    </div>
            </div>
            
            <div className='page-tabs-section'>
                <UserTabs />
            </div>
            
        </div>
    );
}

export default UserDash;