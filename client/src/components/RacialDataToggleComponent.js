// Redux imports
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedRacialData } from '../reducers/MapReducer';

// Mui imports
import { Box, ToggleButton , ToggleButtonGroup, MenuItem, Select} from '@mui/material';

function RacialDataPlanToggle(){
  // Get map from MapReducer
  const map = useSelector(state => state.map)
  const dispatch = useDispatch()

  var selectRaceChange = (event) => {
    let race = event.target.value;
    dispatch(setSelectedRacialData(race));
  }

  if (map.selectedState!= null){
  return(
    <Box>
        <Select
        labelId="state-select-label"
        id="select-race"
        value={map.currentRacialData}
        onChange={selectRaceChange}
        style={{backgroundColor: 'white'}}
        >
          {
            ['population', 'geographic', 'blcVar'].map((element) => (
              <MenuItem value={element}>{element}</MenuItem>
            ))
          }

        </Select>
      </Box>
  )}
  else{
    return;
  }

}
export default RacialDataPlanToggle