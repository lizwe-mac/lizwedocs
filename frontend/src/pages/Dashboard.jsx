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
    <>
    <TopNavigation header={{name:'Dashboard', account:true, arrow:true }}/>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm />

      <section className='content'>
        {goals.length > 0 ? (
          <div className='goals'>
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
      <Stack sx={{ justifyContent: 'center' }} spacing={2} direction="row">
      <Link to="/"><Button variant="contained" size="medium" endIcon={<HomeIcon/>}>Home</Button></Link>
      <Button variant="contained" size="medium" endIcon={<LogoutIcon/>}>Log Out</Button>

      </Stack>
      <SimpleBottomNavigation />
      {/* <Fab onClick={handleOpen}/> */}
      {/* {open && <AddModal close={handleClose} />} */}
      <Modals />
    </>
  )
}

export default Dashboard
