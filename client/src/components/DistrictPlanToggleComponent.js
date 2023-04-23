// Redux imports
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedDistrictPlan } from '../reducers/MapReducer';

// Mui imports
import { Box, ToggleButton , ToggleButtonGroup, MenuItem, Select} from '@mui/material';

function DistrictPlanToggle(){
  // Get map from MapReducer
  const map = useSelector(state => state.map)
  const dispatch = useDispatch()

  var selectYearChange = (event) => {
    const mappings = { "Nevada": "NV", "Ohio": "OH", "Illinois": "IL" }
    let plan = event.target.value
    
    fetch("http://localhost:8080/districtPlan/" + mappings[map.selectedState] + "/" + plan, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
      .then((response) => response.text())
      .then((data) => {
        let planData = JSON.parse(data)
        
        dispatch(setSelectedDistrictPlan({
          "planName": plan,
          "geoJSON": planData.geoJson,
          "ensemble": planData.ensemble,
          "mapCenter": planData.geoJSONCenter
        }));
      })
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
export default DistrictPlanToggle