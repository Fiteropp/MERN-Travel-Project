import React from "react";
import Button from '@mui/material/Button';

function ModTabHotels() {
    return (
        <div>
            <h2>My Hotels</h2>
            <div className="HotelElement">
                <div className="HotelElementContainer">
                    <img className="HotelImage" src="https://picsum.photos/id/164/300/200" alt="" />
                </div>
                <div className="HotelElementText">
                    <h2>Example Hotel</h2>
                    <p>Hotel Description</p>
                    <Button className="edit-button" variant="outlined"><i className='bx bxs-edit bx-sm' ></i>  <span className="edit-button-text">Edit</span></Button>
                </div>
            </div>
        </div>
    )
}

export default ModTabHotels;