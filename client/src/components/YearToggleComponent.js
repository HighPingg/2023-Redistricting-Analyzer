// Redux imports
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedYear } from '../reducers/MapReducer';

// Mui imports
import { Box, ToggleButton , ToggleButtonGroup} from '@mui/material';

function YearToggle(){
  // Get map from MapReducer
  const map = useSelector(state => state.map)
  const dispatch = useDispatch()

  var selectYearChange = (event) => {
    let year = event.target.value
    dispatch(setSelectedYear(year));
  }


  return(
    <Box>
      <ToggleButtonGroup
        color="primary"
        value={map.currentYear}
        exclusive
        onChange={selectYearChange}
        aria-label="Platform"
      >
        <ToggleButton value="2022">2022</ToggleButton>
        <ToggleButton value="2020">2020</ToggleButton>
      </ToggleButtonGroup>
      </Box>
  )}
export default YearToggle