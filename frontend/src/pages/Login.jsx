import { useState, useEffect, useRef } from 'react'
import { FaSignInAlt, FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import TopNavigation from "../components/TopNavigation"
import { Typography } from '@mui/material'
import "@fontsource/kaushan-script"
import { createTheme, ThemeProvider } from '@mui/material';
import Reaptcha from 'reaptcha';
import { pink, grey, blue } from '@mui/material/colors';
import { GitHub, Twitter } from '@mui/icons-material'
import { Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton, Tooltip,  } from '@mui/material'


function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  const [captchaToken, setCaptchaToken] = useState(null);
  const captchaRef = useRef(null);

  const [openDialog, setDialogOpen] = useState(true);
  
  const verify = () =>{
    captchaRef.current.getResponse().then(res => {
        setCaptchaToken(res)
    })
  
  }

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
    if(!captchaToken){
      toast.error('Are you a robot? 🤖')
      return
    }
    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  const handleCancel = () => {
    setDialogOpen(false);
  };

// const handleClose = () => setOpen(false);

  return (
    <div style={{maxWidth: 600, margin: 'auto'}}>
    <Typography sx={{mt:2, mb:2, p:2, fontSize:32, textAlign:'center', fontFamily:'"Kaushan Script"'}} variant="h6" color='#FF225E'>
      LizweDocs
    </Typography>
    {/* <TopNavigation header={{name:'', account:false, arrow:false }}/> */}
    <Typography sx={{mt:2, mb:2, p:2, fontSize:16, textAlign:'center'}} variant="h6" color='#FF225E'>
       LOGIN TO YOUR ACCOUNT
    </Typography>

      <section className='form'>
        <form onSubmit={onSubmit}>
          {/* <div className='form-group'>
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
          </div> */}
              <Stack spacing={2} direction="column">
                <TextField
                 id="outlined-basic" 
                 label="Email" 
                 variant="outlined" 
                 type='email'
                 placeholder='example@email.com'
                 name='email'
                 value={email}
                 onChange={onChange}
                 required/>
                <TextField 
                id="outlined-basic" 
                label="Password" 
                variant="outlined" 
                type='password'
                name='password'
                value={password}
                onChange={onChange}
                required/>
                <Reaptcha 
                sitekey={process.env.REACT_APP_SITE_KEY}
                ref={captchaRef}
                onVerify={verify} 
                />
                <Button type='submit' variant="contained" size="large" sx={{bgcolor:'#FF225E'}} endIcon={<LoginIcon/>}>Login</Button>
      
            </Stack>
          {/* <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div> */}
        </form>
      </section>
      <Typography sx={{mt:5, p:2, fontSize:16, textAlign:'center'}} variant="h6" color=''>
      Do not yet have an account? <Link to="/register"><span><Typography sx={{fontSize:16}} variant="h6" color='#FF225E'>SIGN UP</Typography></span></Link>
    </Typography>
    <Dialog
        open={openDialog}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Just a heads up!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The app is still in development and some features may not be working as intended. It's basically a little open source app that I hope to build and flesh out over time...  
          </DialogContentText>
          <Divider sx={{mt:1, mb:1}} />
          <Stack >
          <Typography sx={{mt:1}}>
          If you would like to help, please check out the project on Github:
          </Typography>
          <a href='https://github.com/lizwe-mac/lizwedocs' target='_blank' rel='noreferrer'>
          <Button sx={{color:grey[800], border:1, mt:1, mb:1}} onClick={handleCancel} startIcon={<GitHub fontSize='medium'/>}>Github</Button>
          </a>
          </Stack>
          <Stack >
          <Typography sx={{mt:0.5}}>
            Or reach me on Twitter:
          </Typography>
          <a href='https://twitter.com/dingiilizwe' target='_blank' rel='noreferrer'>
          <Button sx={{color:blue[500], border:1, mt:1, mb:1}} onClick={handleCancel} startIcon={<Twitter fontSize='small'/>}>Twitter</Button>
          </a>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button sx={{color:pink[500]}} onClick={handleCancel}>Alright 🙂</Button>
          {/* <Button sx={{color:pink[500]}} onClick={handleContinue}>
            Continue
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Login
