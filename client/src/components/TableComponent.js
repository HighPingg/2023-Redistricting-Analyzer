// Redux Imports
import { useSelector } from 'react-redux';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(district, incumbent, result, geovar, popvar) {
    return { district, incumbent, result, geovar, popvar };
  }

const rows = [
    createData('')
];

function TableComponent(){

    let dataPoints = [
        { label: "Bread",  y: [179, 256, 300, 418, 274] },
        { label: "Cake",  y: [252, 346, 409, 437, 374.5] },
        { label: "Biscuit",  y: [236, 281.5, 336.5, 428, 313] },
        { label: "Doughnut",  y: [340, 382, 430, 452, 417] },
        { label: "Pancakes",  y: [194, 224.5, 342, 384, 251] },
        { label: "Bagels",  y: [241, 255, 276.5, 294, 274.5] }
    ]

    return(
        <div>

            Put table here

        </div>


    );
}
export default Table;