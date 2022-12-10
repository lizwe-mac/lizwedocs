import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableFooter } from '@mui/material';
import { useSelector } from 'react-redux';



export default function DenseTable() {

    function createData(description, qty, unit_price, amount) {
        return { description, qty, unit_price, amount };
      }
      
      const { items } = useSelector(state => state.item)
      const rows = []
      const total_arr = []

      
      if(items){
        items.map(elem => 
            {
                rows.push(createData(elem.description, elem.qty, Number(elem.unit_price).toFixed(2), Number(elem.amount).toFixed(2)))
                total_arr.push(Number(elem.amount))
            }
        )
      }

      const total = total_arr.reduce((prevVal, currVal) => prevVal + currVal, 0)

  return (
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 600 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow >
            <TableCell sx={{color:'#FF225E'}}>DESCRIPTION</TableCell>
            <TableCell sx={{color:'#FF225E'}} align="right">QTY</TableCell>
            <TableCell sx={{color:'#FF225E'}} align="right">UNIT&nbsp;PRICE</TableCell>
            <TableCell sx={{color:'#FF225E'}} align="right">AMOUNT</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            // <TableRow
            //   key={row.description}
            //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            // >
            <TableRow
              key={row.description}
            >
              <TableCell component="th" scope="row">
                {row.description}
              </TableCell>
              <TableCell align="center">{row.qty}</TableCell>
              <TableCell align="right">{row.unit_price}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell sx={{color:'#FF225E'}} align='right'>VAT</TableCell>
            <TableCell align='right'>0</TableCell>
        </TableRow>
        <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell sx={{color:'#FF225E'}} align='right'>TOTAL</TableCell>
            <TableCell align='right'>{total.toFixed(2)}</TableCell>
        </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}