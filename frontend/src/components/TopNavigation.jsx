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
import { Stack,Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton, Tooltip,  } from '@mui/material'
import { PersonAdd, Settings, Logout } from '@mui/icons-material'
import { useEffect } from 'react';
import { logout } from '../features/auth/authSlice';


export default function SimpleBottomNavigation({header}) {
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDialog, setOpen] = React.useState(false);
  const [runEffect, setRunEffect] = React.useState(false)

  const navigate = useNavigate()
  const user = useSelector(state => state.auth.user)
  // console.log(user.email)
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

const handleContinue = async () => {
  setOpen(false)
}
  // localStorage.removeItem('user')
  //     localStorage.removeItem('res')
  //     localStorage.removeItem('info')
  //     navigate('/login')
  // const myPromise = new Promise((resolve, reject) => {
  //   setTimeout(() => {
      
  //   }, 300);
    
  // });
  // myPromise.then(navigate('/login'), console.log('error'))
// }

  return (
    <>
    <Box sx={{}}>
    <Paper sx={{ position: 'fixed', top: 0, left: 0, right:0 }}>

      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{display: 'flex', alignItems: 'center', justifyContent:'space-evenly' }}
      >
        {/* {header.arrow && <BottomNavigationAction sx={{border:1, p:0, minWidth:0}} onClick={() => navigate(-1)} icon={<ArrowBackIosNewIcon sx={{ color: pink[500], m:0, p:0, border:1 }} />} />} */}
        {user && <ArrowBackIosNewIcon onClick={() => navigate(-1)} sx={{ color: pink[500], cursor:'pointer'}}/>}
        <Typography sx={{fontSize:20}} variant="h5" component="h5">
          {header.name}
        </Typography>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            {user && <Avatar sx={{ width: 32, height: 32, bgColor: pink[500] }}>{[...user.name][0].toUpperCase()}</Avatar>}
          </IconButton>
        </Tooltip>
      </BottomNavigation>
      </Paper>
      
    </Box>
    <Menu
    anchorEl={anchorEl}
    id="account-menu"
    open={open}
    onClose={handleClose}
    onClick={handleClose}
    PaperProps={{
      elevation: 0,
      sx: {
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        mt: 1.5,
        '& .MuiAvatar-root': {
          width: 32,
          height: 32,
          ml: -0.5,
          mr: 1,
        },
        '&:before': {
          content: '""',
          display: 'block',
          position: 'absolute',
          top: 0,
          right: 14,
          width: 10,
          height: 10,
          bgcolor: 'background.paper',
          transform: 'translateY(-50%) rotate(45deg)',
          zIndex: 0,
        },
      },
    }}
    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
  >
    {/* <MenuItem>
      <Avatar /> Profile
    </MenuItem> */}
    {user && <MenuItem>
      <Avatar sx={{color:pink[500]}} /> {user.email}
    </MenuItem>}
    <Divider />
    {/* <MenuItem>
      <ListItemIcon>
        <PersonAdd fontSize="small" />
      </ListItemIcon>
      Add another account
    </MenuItem> */}
    <MenuItem>
      <ListItemIcon>
        <Settings sx={{color:pink[500]}} fontSize="small" />
      </ListItemIcon>
      Settings
    </MenuItem>
    <MenuItem onClick={handleClickOpen}>
      <ListItemIcon>
        <Logout sx={{color:pink[500]}} fontSize="small" />
      </ListItemIcon>
      Logout
    </MenuItem>
  </Menu>
  <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Logout?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Logging out will delete all locally stored data. 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{color:pink[500]}} onClick={handleCancel}>Cancel</Button>
          <Button sx={{color:pink[500]}} onClick={handleContinue} autoFocus>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}