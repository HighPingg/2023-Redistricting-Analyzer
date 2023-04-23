// Redux imports
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedDistrictPlan } from '../reducers/MapReducer';

// Mui imports
import { Box, ToggleButton , ToggleButtonGroup, MenuItem, Select} from '@mui/material';

function YearToggle(){
  // Get map from MapReducer
  const map = useSelector(state => state.map)
  const dispatch = useDispatch()

  var selectYearChange = (event) => {
    let year = event.target.value
    dispatch(setSelectedDistrictPlan(year));
  }

  if (map.selectedState!= null){
  return(
    <Box>
        <Select
        labelId="state-select-label"
        id="select-state"
        value={map.currentDistrictPlan}
        onChange={selectYearChange}
        style={{backgroundColor: 'white'}}
        >
          {
            map.availableDistrictPlans.map((element) => (
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
export default YearToggle