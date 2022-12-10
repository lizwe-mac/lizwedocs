import React from 'react'
import TopNavigation from '../components/TopNavigation'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux';
import { createInfo, reset } from '../features/recepient/resSlice';
import Spinner from '../components/Spinner';
// import { json } from 'body-parser';

export const New = () => {
     
    const { res, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.res
      )

      let initialState
    if(res){
        initialState = 
            {
                name: res.name,
                email: res.email,
                phone: res.phone,
                address: res.address,
              }
        }
        else{
            initialState = {
                name: '',
                email: '',
                phone: '',
                address: '',
              }
        }
    const [formData, setFormData] = useState(initialState)

      // const [isComplete, setIsComplete] = useState(disabled)
    
      const { name, email, phone, address } = formData
    
      const navigate = useNavigate()
      const dispatch = useDispatch()
    
      
    //   console.log(info);
         
    
      useEffect(() => {
        if (isError) {
          toast.error(message)
          console.log(message)
        }
    
        if (isSuccess) {
          navigate('/create_invoice_info')
        }

        dispatch(reset())

    
      }, [res, isError, isSuccess, message, navigate, dispatch, formData])
    
      const onChange = (e) => {
        e.target.value ? 
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
          })) :
        setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.defaultValue,
        }))
      }
    
      const onSubmit = (e) => {
        e.preventDefault()
    
        if (!name || !email || !phone || !address) {
          toast.error('Please enter all the required information')
        } else {
          const userData = {
            name, 
            email, 
            phone, 
            address,
          }
    
          dispatch(createInfo(userData))
        }
      }
    
      if (isLoading) {
        return <Spinner />
      }

      let buttonEnabled = true
        
            if (!name || !email || !phone || !address) {
                // setButtonEnabled(false)
                buttonEnabled = false
            }

      const myButton = buttonEnabled ? 
            <Button sx={{bgcolor:'#FF225E'}} variant="contained" type='submit'>
            next
          </Button> :
          <Button variant="contained" disabled type='submit'>
          next
        </Button>

      

  const res_info = <><Typography sx={{mt:10, p:2, fontSize:16, textAlign:'left'}} variant="h6" color='#FF225E'>
  2. ENTER RECEPIENT INFORMATION
</Typography>
<form style={{'padding':'0 40px'}} onSubmit={onSubmit}>
<Stack direction="column" spacing={2}>
<Typography sx={{fontSize:12, textAlign:'left'}} variant="h6" color='#FF225E'>
  CONTACT INFORMATION
</Typography>
<TextField id="outlined-basic" name='name' defaultValue={res && res.name} label="Organisation Name" variant="outlined" onChange={onChange}/>
<TextField id="outlined-basic" label="Email" variant="outlined" name='email' defaultValue={res && res.email} onChange={onChange}/>
<TextField id="outlined-basic" label="Phone" variant="outlined" name='phone' defaultValue={res && res.phone} onChange={onChange}/>
<TextField id="outlined-basic" label="Address" variant="outlined" name='address' defaultValue={res && res.address} onChange={onChange}/>
<Stack sx={{display:'flex', flexDirection:'row', alignItems:'center', gap:1, width:'100%'}}>

</Stack>

{myButton}

</Stack>
</form></>
  
return (
  <>
  <TopNavigation header={{name:'Create Invoice', account:true, arrow:true }}/>
  {res_info}
  
  </>
)
}
