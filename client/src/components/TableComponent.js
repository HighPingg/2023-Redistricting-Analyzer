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
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function TableComponent() {

    const map = useSelector(state => state.map)
    const dispatch = useDispatch();

    const tableCellClickHandler = (e, district) => {
      console.log(district);
      dispatch(setSelectedDistrict(district));
    };

    const resetClickHandler = (e) => {
      console.log("reset the district");
      dispatch(setSelectedDistrict(null));
    };
    
    let rows = [];
    if (map.currentGraphData != null) {
        rows = map.currentGraphData.incumbents2022.map(x => [x.district, x.winner, x.votes, x.house, x.loser, x.loserhouse, x.loservotes]);
    } // Should grab all the winner data per district.
    // console.log(rows);
    
    if (map.selectedState != null){
      if (map.currentDistrict == null) {
        return (
  
          <TableContainer component={Paper} sx={{ maxHeight: '42vh' }}>
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
                  <TableRow onClick={(event)=>tableCellClickHandler(event, row[0])} key={row[0]}
                  hover={true} sx={{  '&:last-child td, &:last-child th': { border: 0 } }}>
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
        return (
          <Box>
          <TableContainer component={Paper} sx={{ maxHeight: '42vh' }}>
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
                <TableRow key={map.currentDistrict-1} hover={true}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th">{rows[map.currentDistrict-1][0]}</TableCell>
                    <TableCell>{rows[map.currentDistrict-1][1]}</TableCell>
                    <TableCell>{rows[map.currentDistrict-1][3]}</TableCell>
                    <TableCell>Winner</TableCell>
                    <TableCell>Dummy Data</TableCell>
                    <TableCell>Dummy Data</TableCell>
                </TableRow>
                {rows[map.currentDistrict-1][4].map((incumbent, index) => (
                  <TableRow hover={true} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                    <TableCell>{map.currentDistrict}</TableCell>
                    <TableCell>{incumbent}</TableCell>
                    <TableCell>{rows[map.currentDistrict-1][5][index]}</TableCell>
                    <TableCell>Loser</TableCell>
                    <TableCell>Dummy Data</TableCell>
                    <TableCell>Dummy Data</TableCell>
                  </TableRow>
                ))}
                {/* {rows[map.currentDistrict-1].map((row) => (
                  // console.log(row),
                  <TableRow onClick={(event)=>tableCellClickHandler(event, row[0])} key={row[0]}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th">{row[0]}</TableCell>
                    <TableCell>{row[1]}</TableCell>
                    <TableCell>{row[3]}</TableCell>
                    <TableCell>Loser</TableCell>
                    <TableCell>Dummy Data</TableCell>
                    <TableCell>Dummy Data</TableCell>
                  </TableRow>
                ))} */}
              </TableBody>
            </Table>
            <Button onClick={resetClickHandler} sx={{marginBottom:'10px'}} variant="outlined">Reset</Button>
          </TableContainer>
          
          </Box>
        );
      }
    }
      
    else {
      return "Select a state to show table data";
    }
    }

export default TableComponent;