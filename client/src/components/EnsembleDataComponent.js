import { useSelector } from 'react-redux';

// Mui Imports
import { Box } from '@mui/material';

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
                    Number of District Plans: {map.ensembleData.numDistrictPlans}
                </Box>


                <Box component="div" sx={style} >
                    Number of Incumbents: {map.ensembleData.numIncumbents}
                </Box>



                <Box component="div" sx={style} >
                    Incumbents Predicted To Win: {map.ensembleData.numIncumbentsPredictedtoWin}
                </Box>


                <Box component="div" sx={style} >
                    Average Geographic Variation: {map.ensembleData.averageGeoVariation}
                </Box>



                <Box component="div" sx={style} >
                    Average Population Variation: {map.ensembleData.averagePopVariation}
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
