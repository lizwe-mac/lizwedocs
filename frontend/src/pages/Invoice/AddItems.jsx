import React from 'react'
import TopNavigation from '../../components/TopNavigation'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux';
import { createInfo, reset } from '../../features/items/itemSlice';
import Spinner from '../../components/Spinner';
import Table from '../../components/Table'

export const AddItems = () => {
   const { items } = useSelector(state => state.item)
   console.log('items', items)
    const { res, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.res
      )
    

      let initialState = 
            {
                description: '',
                qty: '',
                unit_price: '',
              }
       
        
    const [formData, setFormData] = useState(initialState)

      // const [isComplete, setIsComplete] = useState(disabled)
    
      const { description, qty, unit_price} = formData
    
      const navigate = useNavigate()
      const dispatch = useDispatch()
    
      
    //   console.log(info);
         
    
      useEffect(() => {
        if (isError) {
          toast.error(message)
          console.log(message)
        }
    
        if (isSuccess) {
        //   navigate('/create_invoice_info')
        }

        dispatch(reset())

    
      }, [res, isError, isSuccess, message, navigate, dispatch, formData])
    
      const onChange = (e) => {
        
        setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
        }))
      }
    
      const onSubmit = (e) => {
        e.preventDefault()
            const amount = Number(qty) * Number(unit_price)
          const userData = {
                description,
                qty,
                unit_price,
                amount,
          }
    
          dispatch(createInfo(userData))
          
        
      }
    
      if (isLoading) {
        return <Spinner />
      }

      let buttonEnabled = true
        
            // if (!description || !qty || !unit_price) {
            //     // setButtonEnabled(false)
            //     buttonEnabled = false
            // }

      const myButton = buttonEnabled ? 
            <Button sx={{bgcolor:'#FF225E'}} variant="contained" type='submit'>
            add
          </Button> :
          <Button variant="contained" disabled type='submit'>
          add
        </Button>

    const doneButton = items ? 
    <Button sx={{bgcolor:'#FF225E', mt:5}} variant="contained" onClick={()=>navigate('/invoice/document')}>
    preview
  </Button> :
  <Button sx={{mt:5}} variant="contained" disabled >
  preview
</Button>

      

  const res_info = <><Typography sx={{mt:10, p:2, fontSize:12, textAlign:'left'}} variant="h6" color='#FF225E'>
ADD INVOICE ITEMS</Typography>
<form style={{'padding':'0 20px'}} onSubmit={onSubmit}>
<Stack direction="column" spacing={1}>
{/* <Typography sx={{fontSize:12, textAlign:'left'}} variant="h6" color='#FF225E'>
  CONTACT INFORMATION
</Typography> */}
<TextField sx={{fontSize:10}} id="outlined-basic" name='description' label="Description" variant="outlined" onChange={onChange}/>
<TextField id="outlined-basic" label="Qty" variant="outlined" name='qty' onChange={onChange}/>
<TextField id="outlined-basic" label="Item Price" variant="outlined" name='unit_price' onChange={onChange}/>

<Stack sx={{display:'flex', flexDirection:'row', alignItems:'center', gap:1, width:'100%'}}>

</Stack>

{myButton}

</Stack>
</form></>
// 

return (
  <>
  <TopNavigation header={{name:'Create Invoice', account:true, arrow:true }}/>
  {res_info}
  
    <Table />
    {doneButton}
  </>
)
}
