import './App.css';

// Redux Imports
import { useSelector } from 'react-redux';

// Components.
import Map from './components/MapComponent';
import DistrictPlanToggle from './components/DistrictPlanToggleComponent'
import Graph from './components/GraphComponent';
import TableComponent from './components/TableComponent';
import EnsembleData from './components/EnsembleDataComponent';

//Visual imports

import Grid from '@mui/material/Grid';
import DisplayToggle from './components/DisplayToggleComponent';
// import Item from '@mui/material/Item';

function App() {
  const map = useSelector(state => state.map);

  if (map.selectedState === null) {
    return (
      <div className="App">
        <Map />
      </div>
    );
  } else {
    return (
      <div className="App">
        <Grid container spacing={2}>
          <Grid item xs={8}> 
            <Map />
          </Grid>
          <Grid item xs={4}>
            {/* <TableComponent/> */}
            <EnsembleData/>
          </Grid>
          <Grid item xs={8}>
          <DisplayToggle/>
            <Graph/>
          </Grid>
          <Grid item xs={4}>
          <TableComponent/>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
