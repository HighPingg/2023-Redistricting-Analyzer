import { useSelector } from 'react-redux';

// Mui Imports
import Brightness1Icon from '@mui/icons-material/Brightness1';
import { Box, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';

function EnsembleData(){
    const map = useSelector(state => state.map);

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
          case "Democrat":
            return "Blue";
          case "Republican":
            return "Red";
          default:
            return "Black";
        }
    }


    if (map.selectedState!= null){
        return(
            <div>
                
                {/* <Typography
                sx={{
                    fontWeight: 'bold',
                    fontSize: '2vw'
                }}>
                {'Ensemble Data for ' + map.selectedState + ' ' + map.currentDistrictPlan}
                </Typography> */}

                <ToggleButtonGroup
                    // value={alignment} ADD STUFF FOR FUNCTIONALLIY
                    exclusive
                    // onChange={handleAlignment} ADD STUFF FOR
                    aria-label="text alignment"
                    >
                    <ToggleButton value="left" aria-label="left aligned">
                    <Typography
                    sx={{
                        fontWeight: 'bold',
                        fontSize: '2vw'
                    }}>
                    {'Ensemble Data for ' + map.selectedState + ' ' + map.currentDistrictPlan}
                    </Typography>
                    </ToggleButton>
                    <ToggleButton value="center" aria-label="centered">
                        <Typography
                        sx={{
                            fontWeight: 'bold',
                            fontSize: '2vw'
                        }}>
                        {'Incumbent Table for ' + map.selectedState + ' ' + map.currentDistrictPlan}
                        </Typography>
                    </ToggleButton>
                </ToggleButtonGroup>



                <Box component="div" sx={style} >
                    <p style={outerTextStyle} > Number of District Plans:&#160; <span style={innerTextStyle} >{ map.ensembleData.numDistrictPlans }</span></p>
                </Box>

                <Box component="div" sx={style} >
                    <p style={outerTextStyle} > Number of Incumbents:&#160; <span style={innerTextStyle} >{ map.ensembleData.numIncumbents }</span></p>
                </Box>

                <Box component="div" sx={style} >
                    <p style={outerTextStyle} > Incumbents Predicted To Win:&#160; <span style={innerTextStyle} >{ map.ensembleData.numIncumbentsPredictedtoWin }</span></p>
                </Box>

                <Box component="div" sx={style} >
                    <p style={outerTextStyle} > Average Geographic Variation:&#160; <span style={innerTextStyle} >{ map.ensembleData.averageGeoVariation }</span></p>
                </Box>

                <Box component="div" sx={style} >
                    <p style={outerTextStyle} > Average Population Variation:&#160; <span style={innerTextStyle} >{ map.ensembleData.averagePopVariation }</span></p>
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
            </div>
        )
    } else {
        return(
            <div>
                Select a state to show more data
            </div>
        );
    }
}

export default EnsembleData;
