import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { pink } from '@mui/material/colors';

export default function FloatingActionButtons() {
  return (
      <>
    <Box sx={{ position:"fixed", bottom:60, right:20 }}>
      <Fab sx={{ color: pink[500] }} aria-label="add">
        <AddIcon />
      </Fab>
      
    </Box>
    </>
  );
}