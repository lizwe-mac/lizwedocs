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

export const DocInfo = () => {

    const navigate = useNavigate()
    const { info } = useSelector(
        (state) => state.info
      )
    const { res } = useSelector(
        (state) => state.res
      )

      const user_info = <><Typography sx={{mt:10, p:2, fontSize:16, textAlign:'left'}} variant="h6" color=''>
      1. YOUR INFORMATION
  </Typography>
 <Stack sx={{pl:6, pr:5, pb:2}} direction="row" spacing={5} >
 <Stack direction="column" spacing={1}>
 <Typography sx={{fontSize:11, textAlign:'left'}} variant="h6" color='#FF225E'>
     ORGANISATION
 </Typography>
 <Typography sx={{fontSize:11, textAlign:'left'}} variant="h6">
     {info.name}
 </Typography>
 
 <Typography sx={{fontSize:11, textAlign:'left'}} variant="h6">
     {info.email}
 </Typography>

 <Typography sx={{fontSize:11, textAlign:'left'}} variant="h6">
     {info.address}
 </Typography>
 
 <Typography sx={{fontSize:11, textAlign:'left'}} variant="h6">
     {info.phone}
 </Typography>
 </Stack>
 <Stack direction="column" spacing={1}>
 
 <Typography sx={{fontSize:11, textAlign:'left'}} variant="h6" color='#FF225E'>
     BANKING DETAILS
 </Typography>
 <Typography sx={{fontSize:11, textAlign:'left'}} variant="h6">
     {info.bank}
 </Typography>
 
 <Typography sx={{fontSize:11, textAlign:'left'}} variant="h6">
     {info.acc_name}
 </Typography>

 <Typography sx={{fontSize:11, textAlign:'left'}} variant="h6">
     {info.account}
 </Typography>
 
 </Stack>
 </Stack>
 <Button sx={{mb:2, bgcolor:'#FF225E'}} variant="contained" onClick={() => navigate('/create-invoice')}>
  edit
</Button>
  <hr /></>
  let res_info = <><Typography sx={{mt:2, p:2, fontSize:14, textAlign:'left'}} variant="h6" color='#FF225E'>
  1. RECEPIENT INFORMATION
  </Typography>
  <Stack sx={{pl:6, pr:5, pb:2}} direction="row" spacing={5} >
  <Stack direction="column" spacing={1}>
  <Typography sx={{fontSize:11, textAlign:'left'}} variant="h6" color='#FF225E'>
  ORGANISATION
  </Typography>
  <Typography sx={{fontSize:11, textAlign:'left'}} variant="h6">
  {res.name}
  </Typography>
  
  <Typography sx={{fontSize:11, textAlign:'left'}} variant="h6">
  {res.email}
  </Typography>
  
  <Typography sx={{fontSize:11, textAlign:'left'}} variant="h6">
  {res.address}
  </Typography>
  
  <Typography sx={{fontSize:11, textAlign:'left'}} variant="h6">
  {res.phone}
  </Typography>
  </Stack>
  </Stack>
  <Button sx={{mb:2, bgcolor:'#FF225E'}} variant="contained" onClick={() => navigate('/create_invoice_next')}>
  edit
</Button>
  <hr />
  <Stack sx={{p:2}}>
  <Button sx={{mt:5, bgcolor:'#FF225E'}}  variant="contained" onClick={() => saveInfo()}>
  save
</Button>
  </Stack></>

const saveInfo = () => {
    toast.success('Successfully saved!')
    navigate('/create_invoice/add_items')
}

  return (
    <>
        <TopNavigation header={{name:'Create Invoice', account:true, arrow:true }}/>
        {user_info}
        {res_info}
    </>
  )
}
