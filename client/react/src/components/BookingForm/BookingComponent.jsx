import React from 'react';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const BookingComponent = () => {
    const [room, setRoom] = React.useState('');

    const handleChange = (event) => {
        setRoom(event.target.value);
    };


    return (
        <div>
             <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="booking-date-pickers">
                    
                    <Box sx={{ width: 1 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Room</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={room}
                            label="Room"
                            onChange={handleChange}
                            >
                            <MenuItem value={10}>Big Room</MenuItem>
                            <MenuItem value={20}>Medium Room</MenuItem>
                            <MenuItem value={30}>VIP Room</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    
                    <DatePicker label="Check In" sx={{ width: '50%' }} />
                    <DatePicker label="Check Out" sx={{ width: '50%' }} />
                </div>
            </LocalizationProvider>
        </div>
    )
}