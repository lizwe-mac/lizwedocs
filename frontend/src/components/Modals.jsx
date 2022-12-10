import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Fab  from '../components/Fab'
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { Link } from 'react-router-dom'

const style = {
  position: 'absolute',
  bottom: 200 ,
  right: '50%',
  transform: 'translateX(50%)',
  width: 300,
  bgcolor: 'white',
  boxShadow: 12,
  borderRadius: 1,
  p: 2,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box sx={{ position:"fixed", bottom:60, right:20 }}>
      <Button onClick={handleOpen}><Fab/></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Link to='/create-invoice'>
          <Typography  sx={{pb: 2, display:'flex', alignItems:'center', gap:2}} id="modal-modal-title" variant="h5" component="h2">
           <NoteAddIcon sx={{color:'#FF225E'}} fontSize='large'/> Create Invoice
          </Typography>
          </Link>
          <hr />
          <Link to='/create-quote'>
          <Typography sx={{pt: 2, display:'flex', alignItems:'center', gap:2}} id="modal-modal-title" variant="h5" component="h2">
          <NoteAddIcon sx={{color:'#FF225E'}} fontSize='large'/> Create Quote
          </Typography>
          </Link>
          
        </Box>
      </Modal>
      </Box>
    </>
  );
}