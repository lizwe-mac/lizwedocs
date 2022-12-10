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
import { createInfo, reset } from '../features/Info/infoSlice';
import Spinner from '../components/Spinner';

export const ToInvoice = () => {
    
        const [formData, setFormData] = useState({
          name: '',
          email: '',
          phone: '',
          address: '',
          bank: '',
          account: '',
          acc_name: '',
        })

        // const [isComplete, setIsComplete] = useState(disabled)
      
        const { name, email, phone, address, bank, account, acc_name } = formData
      
        const navigate = useNavigate()
        const dispatch = useDispatch()
      
        const { info, isLoading, isError, isSuccess, message } = useSelector(
          (state) => state.info
        )
      
        useEffect(() => {
          if (isError) {
            toast.error(message)
            console.log(message)
          }
      
          if (isSuccess) {
            // navigate('/invoice_to')
          }
      
          dispatch(reset())
        }, [info, isError, isSuccess, message, navigate, dispatch])
      
        const onChange = (e) => {
          setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
          }))
        }
      
        const onSubmit = (e) => {
          e.preventDefault()
      
          if (!name || !email || !phone || !address || !bank || !account || !acc_name) {
            toast.error('Please enter all the required information')
          } else {
            const userData = {
              name, 
              email, 
              phone, 
              address, 
              bank, 
              account, 
              acc_name,
            }
      
            dispatch(createInfo(userData))
          }
        }
      
        if (isLoading) {
          return <Spinner />
        }
    
  return (
    <>
    <TopNavigation header={{name:'Create Invoice', account:true, arrow:true }}/>
    <Typography sx={{mt:10, p:2, fontSize:16, textAlign:'left'}} variant="h6" color='#FF225E'>
        ENTER ORGANISATION INFORMATION
    </Typography>
    <form style={{'padding':'0 40px'}} onSubmit={onSubmit}>
    <Stack direction="column" spacing={2}>
    <Typography sx={{fontSize:12, textAlign:'left'}} variant="h6" color='#FF225E'>
        CONTACT INFORMATION
    </Typography>
      <TextField id="outlined-basic" name='name' value={name} label="Organisation Name" variant="outlined" onChange={onChange}/>
      <TextField id="outlined-basic" label="Email" variant="outlined" name='email' value={email} onChange={onChange}/>
      <TextField id="outlined-basic" label="Phone" variant="outlined" name='phone' value={phone} onChange={onChange}/>
      <TextField id="outlined-basic" label="Address" variant="outlined" name='address' value={address} onChange={onChange}/>
      <Stack sx={{display:'flex', flexDirection:'row', alignItems:'center', gap:1, width:'100%'}}>
      <Typography sx={{fontSize:12, textAlign:'left'}} variant="h6" color='#FF225E'>
        Logo (Optional)
    </Typography>
      <TextField id="outlined-basic" variant="outlined" type='file' />
      </Stack>
      <Typography sx={{fontSize:12, textAlign:'left'}} variant="h6" color='#FF225E'>
        BANKING INFORMATION
    </Typography>
    <TextField id="outlined-basic" label="Bank Name" variant="outlined" name='bank' value={bank} onChange={onChange}/>
      <TextField id="outlined-basic" label="Account Number" variant="outlined" name='account' value={account} onChange={onChange}/>
      <TextField id="outlined-basic" label="Account Name" variant="outlined" name='acc_name' value={acc_name} onChange={onChange}/>
      <Button variant="contained" type='submit'>
        next
      </Button>
      
    </Stack>
    </form>
    </>
  )
}
