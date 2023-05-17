import { useDispatch, useSelector } from 'react-redux';
import { setSelectedEnsembleToggle } from '../reducers/MapReducer';

// Mui Imports
import { TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody, Button, Box, Typography, ToggleButtonGroup, ToggleButton } from "@mui/material"
import Brightness1Icon from '@mui/icons-material/Brightness1';

function EnsembleData(){
    const map = useSelector(state => state.map);
    const dispatch = useDispatch();

    const style = {
        margin: 1.5,
        padding: 0.8,
        bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
        color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
        border: '1px solid',
        borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        borderRadius: 2,
        "text-align": 'left'
    }

    const outerTextStyle = {
        fontSize: '11pt',
        fontWeight: 'bold',
        margin: 0
    }

    const innerTextStyle = {
        fontSize: '11pt',
        fontWeight: 'normal'
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

    const titleStyle = {
        "fontWeight": "bold",
        "fontSize": "10pt",
        "padding": "15px"
      }
    
    const rowStyle = {
    "padding": "15px"
    }

    let handleChangeTable = (event) => {
        console.log(event.target.value)
        console.log(map.currentDistrictsInfo)
        dispatch(setSelectedEnsembleToggle(event.target.value))
    }
    return(
        <div>
            
            {/* <Typography
            sx={{
                fontWeight: 'bold',
                fontSize: '2vw'
            }}>
            {'Ensemble Data for ' + map.selectedState + ' ' + map.currentDistrictPlan}
            </Typography> */}

            <h1>{map.selectedState}</h1>

            <ToggleButtonGroup
                color="primary"
                value={map.selectedEnsembleToggle}
                exclusive
                onChange={handleChangeTable}
                aria-label="text alignment"
            >
                <ToggleButton value="incumbent" aria-label="centered" sx={{ fontWeight: 'bold', fontSize: '13pt' }} >
                    {'District Summary'}
                </ToggleButton>
                <ToggleButton value="ensemble" aria-label="left aligned" sx={{ fontWeight: 'bold', fontSize: '13pt' }} >
                    {'Ensemble Summary'}
                </ToggleButton>
            </ToggleButtonGroup>


            {
                map.selectedEnsembleToggle === 'ensemble'
                ?
                <>

                    <Box component="div" sx={style} >
                        <p style={outerTextStyle} > Number of District Plans:&#160; <span style={innerTextStyle} >{ map.ensembleData.numDistrictPlans }</span></p>
                    </Box>

                    <Box component="div" sx={style} >
                        <p style={outerTextStyle} > Average Geographic Variation:&#160; <span style={innerTextStyle} >{ map.ensembleData.averageGeoVariation }</span></p>
                    </Box>

                    <Box component="div" sx={style} >
                        <p style={outerTextStyle} > Average Population Variation:&#160; <span style={innerTextStyle} >{ map.ensembleData.averagePopVariation }</span></p>
                    </Box>
                </>

                :
                <Box>

<>
                    <Box component="div" sx={style} >
                        <p style={outerTextStyle} > Current District Plan:&#160; <span style={innerTextStyle} >{ map.currentDistrictPlan} District Plan </span></p>
                    </Box>

                    <Box component="div" sx={style} >
                        <p style={outerTextStyle} > Number of Districts:&#160; <span style={innerTextStyle} >{ map.currentDistrictsInfo.length }</span></p>
                    </Box>

                    <Box component="div" sx={style} >
                        <p style={outerTextStyle} > Number of Incumbents:&#160; <span style={innerTextStyle} >{ map.ensembleData.numIncumbents }</span></p>
                    </Box>

                    {
                        map.currentDistrictPlan === '2022'
                        ? <Box component="div" sx={style} >
                                <p style={outerTextStyle} >
                                    Most Influential Redistricting Party:&#160;
                                    <Brightness1Icon fontSize={'5px'} sx={{ color: getPartyColor(map.ensembleData.redistrictParty) }} />
                                    <span style={innerTextStyle} >{ map.ensembleData.redistrictParty }</span>
                                </p>
                            </Box>
                        : null
                    }
                </>
                    {/* <TableContainer component={Paper} sx={{ maxHeight: '30vh' }}>
                        <Table aria-aria-label='simple table' stickyHeader >
                            <TableHead>
                            <TableRow>
                                <TableCell sx={titleStyle} >Incumbent</TableCell>
                                <TableCell sx={titleStyle} >Party</TableCell>
                                <TableCell sx={titleStyle} >Geometric Variation</TableCell>
                                <TableCell sx={titleStyle} >Population Variation</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {
                                map.incumbentTable.map((candidate) => (
                                <TableRow hover={true} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                    <TableCell sx={rowStyle} >{ candidate.name }</TableCell>
                                    <TableCell sx={rowStyle} ><Box sx ={{ display: 'flex', flexDirection: 'row', columnGap: '3px' }} ><Brightness1Icon fontSize={'5px'} sx={{ color: getPartyColor(candidate.party) }} /> { candidate.party }</ Box></TableCell>
                                    <TableCell sx={rowStyle} >{ candidate.geoVariation }</TableCell>
                                    <TableCell sx={rowStyle} >{ candidate.popVariation }</TableCell>
                                </TableRow>
                                ))
                            }
                            </TableBody>
                        </Table>
                    </TableContainer> */}
                </Box>
            }
            </div>
    )
}

export default EnsembleData;
