import './App.css';

// Components.
import Map from './components/MapComponent';
import YearToggle from './components/YearToggleComponent'
import Graph from './components/GraphComponent';
import TableComponent from './components/TableComponent';

//Visual imports

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// import Item from '@mui/material/Item';

function App() {
  return (
    <div className="App">
      <Map />
      <YearToggle/>
      <Grid container spacing={2}>
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
