import { useState, useEffect } from 'react'
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

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
    <TopNavigation header={{name:'Login', account:false, arrow:true }}/>
      <section className='heading'>
        <h1>
          <span><FaUser /></span> <span>Login</span>
        </h1>
        <p>Login to your account</p>
      </section>

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
                 onChange={onChange}/>
                <TextField 
                id="outlined-basic" 
                label="Password" 
                variant="outlined" 
                type='password'
                name='password'
                value={password}
                onChange={onChange}/>
                <Button type='submit' variant="contained" size="large" endIcon={<LoginIcon/>}>Login</Button>
      
            </Stack>
          {/* <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div> */}
        </form>
      </section>
      <p className='para'>Do not yet have an account? <Link to="/register"><span>Sign up</span></Link></p>
    </>
  )
}

export default Login
