import './App.css';

// Components.
import Map from './components/MapComponent';
import YearToggle from './components/YearToggleComponent'
import Graph from './components/GraphComponent';
import TableComponent from './components/TableComponent';
import EnsembleData from './components/EnsembleDataComponent';

//Visual imports

import Grid from '@mui/material/Grid';
import DisplayToggle from './components/DisplayToggleComponent';
// import Item from '@mui/material/Item';

function App() {
  return (
    <div className="App">
      <Grid container spacing={2}>
        <Grid item xs={8}> 
          <Map />
          <DisplayToggle/>
        </Grid>
        <Grid item xs={4}>
          {/* <TableComponent/> */}
          <EnsembleData/>
        </Grid>
        <Grid item xs={8}>
          <Graph/>
        </Grid>
        <Grid item xs={4}>
        <TableComponent/>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
