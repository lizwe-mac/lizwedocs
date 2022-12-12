import React from 'react'
import { TextField, Button, Stack, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

export const InvoiceHeader = () => {

    const { info } = useSelector(
        (state) => state.info
      )
    const { res } = useSelector(
        (state) => state.res
      )
        let user_info, res_info

      if(info) {
        user_info=
   <Stack sx={{p:2}} direction="row" spacing={5} alignItems='start' justifyContent='space-between'>
   <Stack direction="row" spacing={1}>
    <Stack>
    {/* <Typography sx={{fontSize:24, textAlign:'left'}} variant="h6" border={1} color='#FF225E'>
       {info.name[0]}
   </Typography> */}
    </Stack>
   <Stack>
   <Typography sx={{fontSize:12, textAlign:'left'}} variant="h6" color='#FF225E'>
       {info.name}
   </Typography>
   <Typography sx={{fontSize:10, textAlign:'left'}} variant="h6">
       {info.address}
   </Typography>
   <Typography sx={{fontSize:10, textAlign:'left'}} variant="h6">
       {info.email}, {info.phone}
   </Typography>
   </Stack>
   
  
   </Stack>
   <Stack direction='column'>
   <Typography sx={{fontSize:14, textAlign:'left'}} variant="h6" color='#FF225E'>
       INVOICE
   </Typography>
   <Typography sx={{fontSize:10, textAlign:'left'}} variant="h6">
       10/12/2022
   </Typography>
   </Stack>
   </Stack>
      }

      if(res){
        res_info=
        <Stack direction='column' alignItems='start' mt={2} p={2}>
            <Typography sx={{fontSize:10, textAlign:'left'}} variant="h6" color='#FF225E'>
       INVOICE FOR:
   </Typography>
            <Typography sx={{fontSize:10, textAlign:'left'}} variant="h6">
       {res.name}
   </Typography>
        </Stack>
      }

  return (
    <>
    {user_info}
    <hr />
    {res_info}
    </>
  )
}
