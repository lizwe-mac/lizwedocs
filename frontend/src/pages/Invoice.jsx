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
import { FormControl, FormHelperText} from '@mui/material';



export const Invoice = () => {

    const { info, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.info
      )
        // console.log('first info', info)
        let initialState
        if(info){
            initialState = {
                name: info.name,
                email: info.email,
                phone: info.phone,
                address: info.address,
                bank: info.bank,
                account: info.account,
                acc_name: info.acc_name,
              }
        }
        else{
            initialState = {
                name: '',
                email: '',
                phone: '',
                address: '',
                bank: '',
                account: '',
                acc_name: '',
              }
        }
        const [formData, setFormData] = useState(initialState)

        // const [buttonEnabled, setButtonEnabled ] = useState(true)

        // const [isComplete, setIsComplete] = useState(disabled)
      
        const { name, email, phone, address, bank, account, acc_name } = formData
      
        const navigate = useNavigate()
        const dispatch = useDispatch()
        
        let buttonEnabled = true
        
            if (!name || !email || !phone || !address || !bank || !account || !acc_name) {
                // setButtonEnabled(false)
                buttonEnabled = false
            }
        
        
        
            const myButton = buttonEnabled ? 
            <Button sx={{bgcolor:'#FF225E', mb:10}} variant="contained" type='submit'>
            next
          </Button> :
          <Button variant="contained" sx={{mb:10}} disabled type='submit'>
          next
        </Button>
          
      
        useEffect(() => {
          if (isError) {
            toast.error(message)
            console.log(message)
          }
      
          if (isSuccess) {
            navigate('/create_invoice_next')
          }
        dispatch(reset())

        }, [info, isError, isSuccess, message, navigate, dispatch])
      
        const onChange = (e) => {
          if(e.target.value){
            setFormData((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }))
          }
          else{
            setFormData((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.defaultValue,
              }))
          }
        }
        let helperText 
        const onSubmit = (e) => {
          e.preventDefault()
      
          if (!name || !email || !phone || !address || !bank || !account || !acc_name) {
            toast.error('Please enter all the required information')
        if(!name){ helperText = 'Enter correct informaton'}
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
    <div style={{maxWidth: 600, margin: 'auto', marginBottom: 50}}>
    <TopNavigation header={{name:'Create Invoice', account:true, arrow:true }}/>
    <Typography sx={{mt:10, p:2, fontSize:16, textAlign:'left'}} variant="h6" color='#FF225E'>
        ENTER ORGANISATION INFORMATION
    </Typography>
    <form style={{'padding':'0 40px'}} onSubmit={onSubmit}>
    <Stack direction="column" spacing={2}>
    <Typography sx={{fontSize:12, textAlign:'left'}} variant="h6" color='#FF225E'>
        CONTACT INFORMATION
    </Typography>
        <FormControl>
        <TextField id="outlined-basic" name='name'  label="Organisation Name" variant="outlined" defaultValue={info!=null ? info.name : null} onChange={onChange}/>
        <FormHelperText color='red'>{helperText}</FormHelperText>
        </FormControl>
      <TextField id="outlined-basic" label="Email" variant="outlined" name='email' defaultValue={info!=null ? info.email : null} onChange={onChange}/>
      <TextField id="outlined-basic" label="Phone" variant="outlined" name='phone' defaultValue={info!=null ? info.phone : null} onChange={onChange}/>
      <TextField id="outlined-basic" label="Address" variant="outlined" name='address' defaultValue={info!=null ? info.address : null} onChange={onChange}/>
      <Stack sx={{display:'flex', flexDirection:'row', alignItems:'center', gap:1, width:'100%'}}>
      <Typography sx={{fontSize:12, textAlign:'left'}} variant="h6" color='#FF225E'>
        Logo (Optional)
    </Typography>
      <TextField id="outlined-basic" variant="outlined" type='file' />
      </Stack>
      <Typography sx={{fontSize:12, textAlign:'left'}} variant="h6" color='#FF225E'>
        BANKING INFORMATION
    </Typography>
    <TextField id="outlined-basic" label="Bank Name" variant="outlined" name='bank' defaultValue={info!=null ? info.bank : null} onChange={onChange}/>
      <TextField id="outlined-basic" label="Account Number" variant="outlined" name='account' defaultValue={info!=null ? info.account : null} onChange={onChange}/>
      <TextField id="outlined-basic" label="Account Name" variant="outlined" name='acc_name' defaultValue={info!=null ? info.acc_name : null} onChange={onChange}/>
      {myButton}
      
    </Stack>
    </form>
    </div>
  )
}
