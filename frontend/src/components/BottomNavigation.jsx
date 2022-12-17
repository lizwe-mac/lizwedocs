import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Paper from '@mui/material/Paper';
import HomeIcon from "@mui/icons-material/Home"
import { pink } from '@mui/material/colors';
import Add from '@mui/icons-material/Add';
import NoteAdd from '@mui/icons-material/NoteAdd';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: 500 }}>
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>

      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon sx={{ color: pink[500] }}/>} />
        <BottomNavigationAction label="Create" icon={<Add />} sx={{ color: pink[500] }}/>
        <BottomNavigationAction label="Recent" icon={<NoteAdd />} sx={{ color: pink[500] }}/>
        
      </BottomNavigation>
      </Paper>
      
    </Box>
  );
}