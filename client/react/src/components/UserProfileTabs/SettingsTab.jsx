import React from "react";
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export function SettingsTab() {

    return (
        <div>
            <FormGroup>
            <FormControlLabel control={<Switch className="edit-switch" defaultChecked />} label="Recieve notifications and news to your email" />
            </FormGroup>
        </div>
    )
}