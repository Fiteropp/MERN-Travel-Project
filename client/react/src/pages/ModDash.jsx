import React from 'react';
import '../styles/moddash.css';

import ModTabs from '../components/ModTabs';



function ModDash() {
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
                            <p className='card-user-email'>test.user@mail.com</p>
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

/*
<img className='profile-pic' src="https://media.istockphoto.com/id/1393750072/vector/flat-white-icon-man-for-web-design-silhouette-flat-illustration-vector-illustration-stock.jpg?s=612x612&w=0&k=20&c=s9hO4SpyvrDIfELozPpiB_WtzQV9KhoMUP9R9gVohoU=" alt="" />
*/