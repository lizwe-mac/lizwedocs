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

function Dashboard() { 
  const [open, setOpen] = useState(false);
  const handleOpen = () => console.log(open);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  )

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
    </div>
  )
}

export default Dashboard
