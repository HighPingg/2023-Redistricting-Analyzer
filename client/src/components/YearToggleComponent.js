// Redux imports
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedYear } from '../reducers/MapReducer';

// Mui imports
import { Box, ToggleButton , ToggleButtonGroup, MenuItem, Select} from '@mui/material';

function YearToggle(){
  // Get map from MapReducer
  const map = useSelector(state => state.map)
  const dispatch = useDispatch()

  var selectYearChange = (event) => {
    let year = event.target.value
    dispatch(setSelectedYear(year));
  }

  if (map.selectedState!= null){
  return(
    <Box>
        <Select
        labelId="state-select-label"
        id="select-state"
        value={map.setSelectedYear}
        onChange={selectYearChange}
        defaultValue={'2022'}
        >
          <MenuItem value={"2022"}>2022</MenuItem>
          <MenuItem value={"2020"}>2020</MenuItem>
          <MenuItem value={"Plan1"}>Plan1</MenuItem>
          <MenuItem value={"Plan2"}>Plan2</MenuItem>
          <MenuItem value={"Plan3"}>Plan3</MenuItem>

        </Select>
      </Box>
  )}
  else{
    return;
  }

}
export default YearToggle