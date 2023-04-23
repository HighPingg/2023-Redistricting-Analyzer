import { useDispatch, useSelector } from 'react-redux';

// Mui Imports
import { useRef, useState } from 'react';
import { alpha, Box, FormControl, IconButton, InputLabel, MenuItem, Select, Tooltip} from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';

function EnsembleData(){
    const map = useSelector(state => state.map);
    const style = {
        textOverflow: 'clip',
        overflow: 'hidden',
        my: 2,
        p: 1,
        bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
        color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
        border: '1px solid',
        borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
    }

    if (map.selectedState!= null){
        return(
            <div>
                <b>{map.currentGraphData.ensembleDataTitle + ' ' + map.currentDistrictPlan}</b>
                <Box component="div" sx={style} >
                    Population Density: {map.currentGraphData.ensembleData.populationDensity}
                </Box>


                <Box component="div" sx={style} >
                    District Plans: {map.currentGraphData.ensembleData.districtPlans}
                </Box>



                <Box component="div" sx={style} >
                    Incumbents Predicted To Win: {map.currentGraphData.ensembleData.incumbentsPredictedToWin}
                </Box>


                <Box component="div" sx={style} >
                    Average Geographic Variation: {map.currentGraphData.ensembleData.averageGeographicVariation}
                </Box>



                <Box component="div" sx={style} >
                    Population Variation In Incumbent District: {map.currentGraphData.ensembleData.populationVariationInIncumbentDistricts}
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
