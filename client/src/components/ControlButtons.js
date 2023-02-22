//Redux imports
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedState } from '../reducers/MapReducer';

//Mui imports
import { Button } from '@mui/material';

function ControlButton(){
  //Get map from MapReducer
  const map = useSelector(state => state.map)
  const dispatch = useDispatch();

  function setSelectedStateOhio(){
    dispatch(setSelectedState('Ohio'))
  }

  return(
      <Button variant="text" onClick= {setSelectedStateOhio}>State:{map.selectedState}</Button>
  )
  }
  export default ControlButton