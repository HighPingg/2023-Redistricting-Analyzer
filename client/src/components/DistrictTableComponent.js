import { TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody, Button, Box, Typography } from "@mui/material"
import Brightness1Icon from '@mui/icons-material/Brightness1';

import { useSelector } from "react-redux";

function DistrictTableComponent() {
    const map = useSelector(state => state.map)

    const titleStyle = {
        "fontWeight": "bold",
        "fontSize": "10pt",
        "padding": "15px"
      }
    
    const rowStyle = {
    "padding": "15px"
    }
    
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


    return (
        map.currentDistrict !== null
        ?   
        <Box>
            <Typography
            sx={{
                fontWeight: 'bold',
                fontSize: '2vw'
            }}>
                Candidates
            </Typography>
            <TableContainer component={Paper} sx={{ maxHeight: '42vh' }}>
                <Table aria-aria-label='simple table' stickyHeader >
                    <TableHead>
                    <TableRow>
                        <TableCell sx={titleStyle} >District</TableCell>
                        <TableCell sx={titleStyle} >Candidate</TableCell>
                        <TableCell sx={titleStyle} >Party</TableCell>
                        <TableCell sx={titleStyle} >{ map.currentDistrictPlan + " W/L" }</TableCell>
                        <TableCell sx={titleStyle} >Total Votes</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        map.currentDistrictsInfo[map.currentDistrict - 1].candidates.map((candidate) => (
                        <TableRow hover={true} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                            <TableCell sx={rowStyle} >{ map.currentDistrict }</TableCell>
                            <TableCell sx={rowStyle} >{ candidate.incumbent ? candidate.name + ' (incumbent)' : candidate.name }</TableCell>
                            <TableCell sx={rowStyle} ><Box sx ={{ display: 'flex', flexDirection: 'row', columnGap: '3px' }} ><Brightness1Icon fontSize={'5px'} sx={{ color: getPartyColor(candidate.party) }} /> { candidate.party }</ Box></TableCell>
                            <TableCell sx={{ ...rowStyle, ...{"color": candidate.winner ? "Green" : "Red" } }} >{ candidate.winner ? "Winner" : "Loser" }</TableCell>
                            <TableCell sx={rowStyle} >{ candidate.totalVotes }</TableCell>
                        </TableRow>
                        ))
                    }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
        :           
        <Box
        display="flex"
        justifyContent= 'center'
        alignItems= 'center'
        sx={{
            pt: 2,
            height: '19.5%',
            width: '100%',
            borderRadius: 2,
            backgroundColor: '#aaacad',
            fontSize: 50,
            fontWeight: 'bold'
        }}
        >
        <Box
        >
        Select District To Display Candidates
        </Box>
</Box>
    );
}

export default DistrictTableComponent