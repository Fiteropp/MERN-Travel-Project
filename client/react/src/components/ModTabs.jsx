import React from "react";

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import ModTabUserInfo from "./UserProfileTabs/ModTabUserInfo";
import ModTabHotels from "./UserProfileTabs/ModTabHotels";
import { SettingsTab } from "./UserProfileTabs/SettingsTab";

import '../styles/moddash.css';



function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} centered variant="fullWidth" aria-label="basic tabs example" className="tabs-sp-bw">
          <Tab className="tab-style" label="Account" {...a11yProps(0)} />
          <Tab className="tab-style" label="Hotels" {...a11yProps(1)} />
          <Tab className="tab-style" label="Settings" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ModTabUserInfo />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ModTabHotels />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <SettingsTab />
      </CustomTabPanel>
    </Box>
  );
}