import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Checkbox, Typography } from '@mui/material';
import { Link } from 'react-router-dom'

export default function CheckboxLabels() {
  return (
    <FormGroup sx={{display:'flex', flexDirection:'row', alignItems:'center', gap:0.5}}>
      {/* <FormControlLabel control={<Checkbox />} label="" /> */}
      <Checkbox required/>
      <Typography>I have read and agree to the <Link style={{textDecoration:'underline', color:'#FF225E'}} to=''>Privacy Policy</Link></Typography>
    </FormGroup>
  );
}