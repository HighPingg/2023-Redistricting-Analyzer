import { useDispatch, useSelector } from 'react-redux';

// Mui Imports
import { useRef, useState } from 'react';
import { alpha, Box, FormControl, IconButton, InputLabel, MenuItem, Select, Tooltip} from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';

function EnsembleData(){
    const map = useSelector(state => state.map);
    let display = "Select a state to show more data"
    let options, series = null

    if (map.selectedState!= null){
        display =
        <div>
            <b>{map.currentGraphData.ensembleDataTitle + ' ' + map.currentDistrictPlan}</b>
            <Box
                component="div"
                sx={{
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
                }}
            >
                Population Density: {map.currentGraphData.ensembleData.populationDensity}
            </Box>


            <Box
                component="div"
                sx={{
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
                }}
            >
                District Plans: {map.currentGraphData.ensembleData.districtPlans}
            </Box>



            <Box
                component="div"
                sx={{
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
                }}
            >
                Incumbents Predicted To Win: {map.currentGraphData.ensembleData.incumbentsPredictedToWin}
            </Box>


            <Box
                component="div"
                sx={{
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
                }}
            >
                Average Geographic Variation: {map.currentGraphData.ensembleData.averageGeographicVariation}
            </Box>



            <Box
                component="div"
                sx={{
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
                }}
            >
                Population Variation In Incumbent District: {map.currentGraphData.ensembleData.populationVariationInIncumbentDistricts}
            </Box>
        </div>
  
    }
    return(
        <div>
            {display}
        </div>
    );
}

export default EnsembleData;
