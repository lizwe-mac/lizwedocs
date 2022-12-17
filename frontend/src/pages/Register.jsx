import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import TopNavigation from "../components/TopNavigation"
import { Typography } from '@mui/material'
import "@fontsource/kaushan-script"

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/dashboard')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name,
        email,
        password,
      }

      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div style={{maxWidth: 600, margin: 'auto'}}>
    <Typography sx={{mt:10, mb:2, p:2, fontSize:32, textAlign:'center', fontFamily:'"Kaushan Script"'}} variant="h6" color='#FF225E'>
      LizweDocs
    </Typography>
    <TopNavigation header={{name:'Register', account:false, arrow:false }}/>
    <Typography sx={{mt:2, mb:2, p:2, fontSize:16, textAlign:'center'}} variant="h6" color='#FF225E'>
       CREATE FREE ACCOUNT
    </Typography>

      <section className='form'>
        <form onSubmit={onSubmit}>
          {/* <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              placeholder='Enter your name'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              placeholder='Confirm password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div> */}
          <Stack spacing={2} direction="column">
                <TextField
                 id="outlined-basic" 
                 label="Name" 
                 variant="outlined" 
                 type='text'
                 placeholder='Jane Doe'
                 name='name'
                 value={name}
                 onChange={onChange}/>
                <TextField
                 id="outlined-basic" 
                 label="Email" 
                 variant="outlined" 
                 type='email'
                 placeholder='example@email.com'
                 name='email'
                 value={email}
                 onChange={onChange}/>
                
                <TextField 
                id="outlined-basic" 
                label="Password" 
                variant="outlined" 
                type='password'
                name='password'
                value={password}
                onChange={onChange}/>
                <TextField 
                id="outlined-basic" 
                label="Re-enter Password" 
                variant="outlined" 
                type='password'
                name='password2'
                value={password2}
                onChange={onChange}/>
                <Button type='submit' variant="contained" size="large" sx={{bgcolor:'#FF225E'}} endIcon={<LoginIcon/>}>Sign Up</Button>
      
            </Stack>
        </form>
      </section>
      <Typography sx={{mt:5, p:2, fontSize:16, textAlign:'center'}} variant="h6" color=''>
     Already have an account? <Link to="/login"><span><Typography sx={{fontSize:16}} variant="h6" color='#FF225E'>Login</Typography></span></Link>
    </Typography>

    </div>
  )
}

export default Register
