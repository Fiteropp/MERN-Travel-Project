import React from 'react';
import '../styles/moddash.css';
import { useEffect, useState } from 'react';

import ModTabs from '../components/ModTabs';



function ModDash() {

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
            <div className='header-section'>
                    <img className='wide-header-image' src="https://images.pexels.com/photos/2832061/pexels-photo-2832061.jpeg" alt="" />
                
                    <div className='profile-card'>
                        
                        <div className='profile-pic-frame'>
                            <img  src="https://picsum.photos/200/200" alt="" className='card' />
                        </div>
                        
                        <div className='profile-card-info'>
                            <h3 className='card-username'>Test User</h3>
                            <p className='card-user-email'>{user?.email}</p>
                        </div>
                    </div>
            </div>
            
            <div className='page-tabs-section'>
                <ModTabs />
            </div>
            
        </div>
    );
}

export default ModDash;