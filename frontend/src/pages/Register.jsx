import { useState, useEffect, useRef } from 'react'
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
import Checkbox from '../components/Checkbox'
import "@fontsource/kaushan-script"
import Reaptcha from 'reaptcha';
import reCAPTCHA from "react-google-recaptcha"

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const key = process.env.REACT_APP_SITE_KEY

  const { name, email, password, password2 } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  const [captchaToken, setCaptchaToken] = useState(null);
const captchaRef = useRef(null);

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
      toast.error('Are you perhaps a robot? 🤖')
      return
    }

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
          
          <Stack spacing={2} direction="column">
                <TextField
                 id="outlined-basic" 
                 label="Name" 
                 variant="outlined" 
                 type='text'
                 placeholder='Jane Doe'
                 name='name'
                 value={name}
                 onChange={onChange}
                 required/>
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
                onChange={onChange}
                required/>
                <TextField 
                id="outlined-basic" 
                label="Re-enter Password" 
                variant="outlined" 
                type='password'
                name='password2'
                value={password2}
                onChange={onChange}
                required/>
                <Checkbox required/>
                <Reaptcha 
                sitekey={process.env.REACT_APP_SITE_KEY}
                ref={captchaRef}
                onVerify={verify} 
                />
                {/* <reCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY}/> */}
                <Button type='submit' variant="contained" size="large" sx={{bgcolor:'#FF225E'}} endIcon={<LoginIcon/>}>Sign Up</Button>
                
            </Stack>
        </form>
      </section>
      <Typography sx={{mt:5, p:2, fontSize:16, textAlign:'center'}} variant="h6" color=''>
     Already have an account? <Link to="/login"><span><Typography sx={{fontSize:16}} variant="h6" color='#FF225E'>LOGIN</Typography></span></Link>
    </Typography>

    </div>
  )
}

export default Register
