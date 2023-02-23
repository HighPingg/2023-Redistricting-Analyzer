//Redux imports
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedState } from '../reducers/MapReducer';

//Mui imports
import { Box } from '@mui/material';
import { Button } from '@mui/material';

function ControlButton(){
  //Get map from MapReducer
  const map = useSelector(state => state.map)
  const dispatch = useDispatch();

  //Functions that set the selected state, which are Ohio, Nevada, Illinois 
  function setSelectedStateOhio(){
    dispatch(setSelectedState('Ohio'))
  }
  function setSelectedStateNevada(){
    dispatch(setSelectedState('Nevada'))
  }
  function setSelectedStateIllinois(){
    dispatch(setSelectedState('Illinois'))
  }

  return(
    <Box>
      <Button variant="text" onClick= {setSelectedStateOhio}>StateOhio:{map.selectedState}</Button>
      <Button variant="text" onClick= {setSelectedStateNevada}>StateNevada:{map.selectedState}</Button>
      <Button variant="text" onClick= {setSelectedStateIllinois}>StateIllinois:{map.selectedState}</Button>
    </Box>
  )
  }
  export default ControlButton