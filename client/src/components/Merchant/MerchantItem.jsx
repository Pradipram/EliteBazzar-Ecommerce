import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import "./Merchant.css"

const MerchantItem = ({merchantProducts}) => {
  return (
    <div className="px-5 pb-5 pt-2">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align='right'>Discount</TableCell>
              <TableCell align="right">Update</TableCell>
              <TableCell align="right">Add Product</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {merchantProducts.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">100</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align='right'>{row.discount}</TableCell>
                <TableCell align="right">Update</TableCell>
                <TableCell align="right">Add</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Paper elevation={3} />
    </div>
  );
};

export default MerchantItem;
