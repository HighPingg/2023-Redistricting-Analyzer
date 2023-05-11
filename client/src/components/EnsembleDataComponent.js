import { useSelector } from 'react-redux';

// Mui Imports
import { Box, Typography } from '@mui/material';

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
        marginLeft: '8px',
        fontSize: '11pt',
        fontWeight: 'normal'
    }

    if (map.selectedState!= null){
        return(
            <div>
                <Typography variant='h3'
                sx={{fontWeight: 'bold'}}>
                {'Ensemble Data for ' + map.selectedState + ' ' + map.currentDistrictPlan}
                </Typography>
                <Box component="div" sx={style} >
                    <p style={outerTextStyle} > Number of District Plans: <span style={innerTextStyle} >{ map.ensembleData.numDistrictPlans }</span></p>
                </Box>

                <Box component="div" sx={style} >
                    <p style={outerTextStyle} > Number of Incumbents: <span style={innerTextStyle} >{ map.ensembleData.numIncumbents }</span></p>
                </Box>

                <Box component="div" sx={style} >
                    <p style={outerTextStyle} > Incumbents Predicted To Win: <span style={innerTextStyle} >{ map.ensembleData.numIncumbentsPredictedtoWin }</span></p>
                </Box>

                <Box component="div" sx={style} >
                    <p style={outerTextStyle} > Average Geographic Variation: <span style={innerTextStyle} >{ map.ensembleData.averageGeoVariation }</span></p>
                </Box>

                <Box component="div" sx={style} >
                    <p style={outerTextStyle} > Average Population Variation: <span style={innerTextStyle} >{ map.ensembleData.averagePopVariation }</span></p>
                </Box>
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
