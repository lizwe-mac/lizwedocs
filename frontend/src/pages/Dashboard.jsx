import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoalForm from '../components/GoalForm'
import GoalItem from '../components/GoalItem'
import Spinner from '../components/Spinner'
import { getGoals, reset } from '../features/goals/goalSlice'
import { Button, Modal, Stack } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom'
import SimpleBottomNavigation from "../components/BottomNavigation"
import TopNavigation from "../components/TopNavigation"
import Fab from "../components/Fab"
import AddModal from "../components/AddModal"
import Modals from "../components/Modals"
import { Typography, TextField } from '@mui/material'
import Combobox from '../components/Combobox'
import { pink, grey } from '@mui/material/colors';
import { NoteAdd } from '@mui/icons-material'
import { Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton, Tooltip,  } from '@mui/material'

function Dashboard() { 
  const [open, setOpen] = useState(false);
  const [openDialog, setDialogOpen] = useState(true);
  const handleOpen = () => console.log(open);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  )

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleCancel = () => {
    setDialogOpen(false);
  };

const handleContinue = async () => {
  setDialogOpen(false)
}

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getGoals())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  

  return (
    <div style={{maxWidth: 600, margin: 'auto'}}>
    <TopNavigation header={{name:'Dashboard', account:true, arrow:true }}/>
      

      {/* <GoalForm /> */}
      <Combobox/>

      <Typography sx={{fontSize:14, textAlign:'left'}} variant="h6" color='#FF225E' mt={5} ml={2}>
        Recent Documents
      </Typography>

      {/* <section className='content'>
        {goals.length > 0 ? (
          <div className='goals'>
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section> */}
      <Stack sx={{ justifyContent: 'center' }} spacing={2} direction="row">
      

      </Stack>
      <SimpleBottomNavigation />
      {/* <Fab onClick={handleOpen}/> */}
      {/* {open && <AddModal close={handleClose} />} */}
      <Modals />
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Let's get started!"}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-description">
            Logging out will delete all locally stored data. 
          </DialogContentText> */}
          <Stack >
          <Link to='/create-invoice'>
          <Button sx={{color:pink[500]}} onClick={handleCancel} startIcon={<NoteAdd sx={{color:'#FF225E'}} fontSize='small'/>}>Create Invoice</Button>
          </Link>
          <Button sx={{color:grey[500]}} onClick={handleCancel} startIcon={<NoteAdd sx={{color:grey[500]}} fontSize='small'/>} disabled>Create Invoice</Button>
          
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button sx={{color:pink[500]}} onClick={handleCancel}>Cancel</Button>
          {/* <Button sx={{color:pink[500]}} onClick={handleContinue}>
            Continue
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Dashboard
