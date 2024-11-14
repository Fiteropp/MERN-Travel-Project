import React from "react";
import Button from '@mui/material/Button';
import 'boxicons'

function ModTabUserInfo() {
    return ( 
        <div>
            <h2>Account</h2>
            <div className="account-tab">
                <div className="account-tab-element">
                    <div>
                        <span className="account-small-label">Name</span><br />
                        <span className="account-info-line">test.user@test.com</span>
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