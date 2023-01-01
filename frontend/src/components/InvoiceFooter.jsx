import React from 'react'
import { TextField, Button, Stack, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

export const InvoiceFooter = () => {

    const { info } = useSelector(
        (state) => state.info
      )
    
        let user_info
      if(info) {
        user_info=
   <Stack sx={{p:2, mb:5}} direction="column" alignItems='start'>
   <Typography sx={{fontSize:11, textAlign:'left'}} variant="h6" color='#FF225E'>
     BANKING DETAILS
 </Typography>
 
 <Typography sx={{fontSize:10, textAlign:'left'}} variant="h6">
     {info.acc_name}
 </Typography>
   <Typography sx={{fontSize:10, textAlign:'left'}} variant="h6">
     {info.bank}
 </Typography>

 <Typography sx={{fontSize:10, textAlign:'left'}} variant="h6">
     {info.account}
 </Typography>
   </Stack>
      }

  return (
    <>
    {user_info}
    </>
  )
}
