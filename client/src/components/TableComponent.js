// Redux Imports
import * as React from 'react';

// Imports for graphing util.
// import Chart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentlyHovered, setSelectedDistrict, setSelectedState } from '../reducers/MapReducer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';

function TableComponent() {

    const map = useSelector(state => state.map)
    const dispatch = useDispatch();

    const tableCellClickHandler = (e) => {
      console.log(e.target);
    };
    
    let rows = [];
    if (map.currentGraphData != null) {
        rows = map.currentGraphData.incumbents2022.map(x => [x.district, x.winner, x.votes, x.house]);
    } // Should grab all the winner data per district.
    // console.log(rows);
    
    if (map.selectedState != null){
      if (map.currentDistrict == null) {
        return (
  
          <TableContainer component={Paper} sx={{ maxHeight: '95vh' }}>
            <Table aria-aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>District</TableCell>
                  <TableCell>Incumbent</TableCell>
                  <TableCell>Party</TableCell>
                  <TableCell>2022 W/L</TableCell>
                  <TableCell>Geographic Variation</TableCell>
                  <TableCell>Population Variation</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  // console.log(row),
                  <TableRow onClick={tableCellClickHandler} key={row[0]}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th">{row[0]}</TableCell>
                    <TableCell>{row[1]}</TableCell>
                    <TableCell>{row[3]}</TableCell>
                    <TableCell>Winner</TableCell>
                    <TableCell>Dummy Data</TableCell>
                    <TableCell>Dummy Data</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );
      }
      else {

      }
    }
      
    else {
      return "Select a state to show table data";
    }
    }

export default TableComponent;