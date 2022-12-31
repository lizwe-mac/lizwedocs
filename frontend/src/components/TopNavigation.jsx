import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Paper from '@mui/material/Paper';
import HomeIcon from "@mui/icons-material/Home"
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { pink } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import { Stack } from '@mui/material'

export default function SimpleBottomNavigation({header}) {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate()
  const user = useSelector(state => state.auth.user)
  console.log(user.email)

  return (
    <Box sx={{}}>
    <Paper sx={{ position: 'fixed', top: 0, left: 0, right: 0, }}>

      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{display: 'flex', alignItems: 'center', justifyContent:'space-between' }}
      >
        {header.arrow && <BottomNavigationAction onClick={() => navigate(-1)} icon={<ArrowBackIosNewIcon sx={{ color: pink[500] }} />} />}
        <Typography sx={{fontSize:20}} variant="h5" component="h5">
          {header.name}
        </Typography>
        <Stack sx={{display:'flex', alignItems:'center', flexDirection:'row', gap:1, mr:5, ml:5}}>
        {/* {header.account && <BottomNavigationAction icon={<AccountCircleIcon sx={{ color: pink[500] }} />} />} */}
        <AccountCircleIcon sx={{ color: pink[500] }} />
        {header.account && 
        <Typography sx={{fontSize:15}} variant="h4" component="h4">
        {user.name}
      </Typography>}
        </Stack>
      </BottomNavigation>
      </Paper>
      
    </Box>
  );
}