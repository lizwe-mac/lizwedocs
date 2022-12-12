import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Paper from '@mui/material/Paper';
import HomeIcon from "@mui/icons-material/Home"
import { Typography } from '@mui/material';

export default function SimpleBottomNavigation({header}) {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: 500 }}>
    <Paper sx={{ position: 'fixed', top: 0, left: 0, right: 0, }}>

      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{display: 'flex', alignItems: 'center' }}
      >
        {header.arrow && <BottomNavigationAction icon={<ArrowBackIosNewIcon />} />}
        <Typography variant="h5" component="h5">
          {header.name}
        </Typography>
        {header.account && <BottomNavigationAction icon={<AccountCircleIcon />} />}
        
      </BottomNavigation>
      </Paper>
      
    </Box>
  );
}