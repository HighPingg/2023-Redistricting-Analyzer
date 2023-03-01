// Redux imports
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedDisplay } from '../reducers/MapReducer';

// Mui imports
import { Box, ToggleButton , ToggleButtonGroup} from '@mui/material';

function DisplayToggle(){
  // Get map from MapReducer
  const map = useSelector(state => state.map)
  const dispatch = useDispatch()

  var selectDisplayChange = (event) => {
    let displayMode = event.target.value
    dispatch(setSelectedDisplay(displayMode));
  }


  return(
    <Box
    >
      <ToggleButtonGroup
        color="primary"
        value={map.currentDisplay}
        exclusive
        onChange={selectDisplayChange}
        aria-label="Platform"
      >
        <ToggleButton value="BoxWhisker">Box and Whisker</ToggleButton>
        <ToggleButton value="SplitParty">Split Party View</ToggleButton>
      </ToggleButtonGroup>
      </Box>
  )}
export default DisplayToggle