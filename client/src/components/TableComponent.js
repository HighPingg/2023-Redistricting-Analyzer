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

  const getPartyColor = (party) => {
    switch (party) {
      case "Democratic":
        return "Blue";
      case "Republican":
        return "Red";
      default:
        return "Black";
    }
  }

  const titleStyle = {
    "fontWeight": "bold",
    "fontSize": "10pt",
    "padding": "15px"
  }

  const rowStyle = {
    "padding": "15px"
  }

  // Filter out all of the incumbents
  let incumbents = []
  map.currentDistrictsInfo.forEach(district => {
    // If we dont find an incumbent for this district, then we want to add an empty row.
    let foundIncumbent = false;
    district.candidates.forEach((candidate) => {
      if (candidate.incumbent) {
        incumbents.push([{
              "districtNumber": district.districtNumber,
              "geographicVariation": district.geographicVariation,
              "populationVariation": district.populationVariation
        }, candidate]);

        foundIncumbent = true;
      }
    });

    if (!foundIncumbent) {
      incumbents.push([district.districtNumber, null])
    }
  });

  // Default view with all of the incumbents for each district
  if (map.currentDistrict == null) {
    return (
      <TableContainer component={Paper} sx={{ maxHeight: '42vh' }}>
        <Table aria-aria-label='simple table' stickyHeader >
          <TableHead>
            <TableRow>
              <TableCell sx={titleStyle} >District</TableCell>
              <TableCell sx={titleStyle} >Incumbent</TableCell>
              <TableCell sx={titleStyle} >Party</TableCell>
              <TableCell sx={titleStyle} >W/L</TableCell>
              <TableCell sx={titleStyle} >Geographic Variation</TableCell>
              <TableCell sx={titleStyle} >Population Variation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              incumbents.map((incumbent) => incumbent[1] === null ? 
                // Display placeholder with no incumbent
                <TableRow
                  sx={{  '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell sx={rowStyle} >{ incumbent[0] }</TableCell>
                  <TableCell sx={rowStyle} > No Incumbent </TableCell>
                  <TableCell sx={rowStyle} ></TableCell>
                  <TableCell sx={rowStyle} ></TableCell>
                  <TableCell sx={rowStyle} ></TableCell>
                  <TableCell sx={rowStyle} ></TableCell>
                </TableRow>
              :
                // Display normal cell with incumbent
              (<TableRow onClick={(event)=>tableCellClickHandler(event, incumbent[0].districtNumber)}
                          key={incumbent[0].districtNumber}
                          hover={true}
                          sx={{  '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell sx={rowStyle} >{ incumbent[0].districtNumber }</TableCell>
                  <TableCell sx={rowStyle} >{ incumbent[1].name }</TableCell>
                  <TableCell sx={{ ...rowStyle, ...{"color": getPartyColor(incumbent[1].party) }}} >{ incumbent[1].party }</TableCell>
                  <TableCell sx={{ ...rowStyle, ...{"color": incumbent[1].winner ? "Green" : "Red" } }} >{ incumbent[1].winner ? "Winner" : "Loser" }</TableCell>
                  <TableCell sx={rowStyle} >{ incumbent[0].geographicVariation }</TableCell>
                  <TableCell sx={rowStyle} >{ incumbent[0].populationVariation }</TableCell>
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
        <Table aria-aria-label='simple table' stickyHeader >
          <TableHead>
            <TableRow>
              <TableCell sx={titleStyle} >District</TableCell>
              <TableCell sx={titleStyle} >Candidate</TableCell>
              <TableCell sx={titleStyle} >Party</TableCell>
              <TableCell sx={titleStyle} >2022 W/L</TableCell>
              <TableCell sx={titleStyle} >Total Votes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              map.currentDistrictsInfo[map.currentDistrict - 1].candidates.map((candidate) => (
                <TableRow hover={true} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                  <TableCell sx={rowStyle} >{ map.currentDistrict }</TableCell>
                  <TableCell sx={rowStyle} >{ candidate.incumbent ? candidate.name + ' (incumbent)' : candidate.name }</TableCell>
                  <TableCell sx={{ ...rowStyle, ...{"color": getPartyColor(candidate.party) }}} >{ candidate.party }</TableCell>
                  <TableCell sx={{ ...rowStyle, ...{"color": candidate.winner ? "Green" : "Red" } }} >{ candidate.winner ? "Winner" : "Loser" }</TableCell>
                  <TableCell sx={rowStyle} >{ candidate.totalVotes }</TableCell>
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