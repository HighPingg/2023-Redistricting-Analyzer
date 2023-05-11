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
  

  return (
    <TableContainer component={Paper} sx={{ maxHeight: '42vh' }}>
      <Table aria-aria-label='simple table' stickyHeader >
        <TableHead>
          <TableRow>
            <TableCell sx={titleStyle} >District</TableCell>
            <TableCell sx={titleStyle} >Incumbent</TableCell>
            <TableCell sx={titleStyle} >Party</TableCell>
            <TableCell sx={titleStyle} >{ map.currentDistrictPlan + " W/L" }</TableCell>
            {
              // Hide fields in 2020 plan
              map.currentDistrictPlan != '2020' 
              ?  <>
                  <TableCell sx={titleStyle} >Geographic Variation</TableCell>
                  <TableCell sx={titleStyle} >Population Variation</TableCell>
                  <TableCell sx={titleStyle} >Seat Safe?</TableCell>
                </>
              : null
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            incumbents.map((incumbent) => incumbent[1] === null 
            ? null
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
                {
                  // Hide fields in 2020 plan
                  map.currentDistrictPlan != '2020' 
                  ? <TableCell sx={rowStyle} >{ incumbent[0].geographicVariation }</TableCell>
                  : null
                }
                {
                  // Hide fields in 2020 plan
                  map.currentDistrictPlan != '2020' 
                  ? <TableCell sx={rowStyle} >{ incumbent[0].populationVariation }</TableCell>
                  : null
                }
                {
                  // Hide fields in 2020 plan
                  map.currentDistrictPlan != '2020' 
                  ? <TableCell sx={rowStyle} >{ incumbent[1].safeSeat ? 'Yes' : 'No' }</TableCell>
                  : null
                }
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableComponent;