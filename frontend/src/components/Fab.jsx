import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export default function FloatingActionButtons() {
  return (
      <>
    <Box sx={{ position:"fixed", bottom:60, right:20 }}>
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
      
    </Box>
    </>
  );
}