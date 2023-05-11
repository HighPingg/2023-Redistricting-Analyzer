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

  if (map.selectedState!= null){
  return(
    <Box
    sx = {{pb: '.5%'}}
    >
      <ToggleButtonGroup
        color="primary"
        value={map.currentDisplay}
        exclusive
        onChange={selectDisplayChange}
        aria-label="Platform"
        sx={{
          'marginTop': '10px'
        }}
      >
        <ToggleButton value="BoxWhisker">Box and Whisker</ToggleButton>
        <ToggleButton value="SplitParty">Split Party View</ToggleButton>
        <ToggleButton value="Demographic">Demographic</ToggleButton>
      </ToggleButtonGroup>
      </Box>
  )}
  else{
    return;
  }

}
export default DisplayToggle