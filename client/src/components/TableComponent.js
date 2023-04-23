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
    dispatch(setSelectedDistrict(district));
  };

  const resetClickHandler = (e) => {
    dispatch(setSelectedDistrict(null));
  };

  console.log(map.currentDistrictsInfo)

  // Default view with all of the incumbents for each district
  if (map.currentDistrict == null) {
    return (
      <TableContainer component={Paper} sx={{ maxHeight: '42vh' }}>
        <Table aria-aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>District</TableCell>
              <TableCell>Incumbent</TableCell>
              <TableCell>Party</TableCell>
              <TableCell>W/L</TableCell>
              <TableCell>Geographic Variation</TableCell>
              <TableCell>Population Variation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              map.currentDistrictsInfo.map((district) => (
                <TableRow onClick={(event)=>tableCellClickHandler(event, district.districtNumber)}
                          key={district.districtNumber}
                          hover={true}
                          sx={{  '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th">{district.districtNumber}</TableCell>
                  <TableCell>{ district.incumbent.name }</TableCell>
                  <TableCell>{ district.incumbent.party }</TableCell>
                  <TableCell>{ district.incumbent.winner ? "Winner" : "Loser" }</TableCell>
                  <TableCell>{ district.incumbent.geographicVariation }</TableCell>
                  <TableCell>{ district.incumbent.populationVariation }</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  // After selecting a district, we want to show all the candidates for that district instead.
  else {
    return (
      <TableContainer component={Paper} sx={{ maxHeight: '42vh' }}>
        <Table aria-aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>District</TableCell>
              <TableCell>Candidate</TableCell>
              <TableCell>Party</TableCell>
              <TableCell>2022 W/L</TableCell>
              <TableCell>Geographic Variation</TableCell>
              <TableCell>Population Variation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              map.currentDistrictsInfo[map.currentDistrict - 1].candidates.map((candidate) => (
                <TableRow hover={true} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                  <TableCell>{ map.currentDistrict }</TableCell>
                  <TableCell>{ candidate.name }</TableCell>
                  <TableCell>{ candidate.party }</TableCell>
                  <TableCell>{ candidate.winner ? "Winner" : "Loser" }</TableCell>
                  <TableCell>{ candidate.geographicVariation }</TableCell>
                  <TableCell>{ candidate.populationVariation }</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
        <Button onClick={resetClickHandler} sx={{marginBottom:'10px'}} variant="outlined">Reset</Button>
      </TableContainer>
    );
  }
}

export default TableComponent;