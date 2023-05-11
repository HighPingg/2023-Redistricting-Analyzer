import './App.css';

// Redux Imports
import { useSelector } from 'react-redux';

// Components.
import Map from './components/MapComponent';
import DistrictPlanToggle from './components/DistrictPlanToggleComponent'
import Graph from './components/GraphComponent';
import TableComponent from './components/TableComponent';
import EnsembleData from './components/EnsembleDataComponent';
import AppBar from './components/AppBar';

//Visual imports

import DisplayToggle from './components/DisplayToggleComponent';
import { Box } from '@mui/material';
import DistrictTableComponent from './components/DistrictTableComponent';
// import Item from '@mui/material/Item';

function App() {
  const map = useSelector(state => state.map);

  if (map.selectedState === null) {
    return (
      <div className="App">
        <AppBar />
        <Map />
      </div>
    );
  } else {
    return (
      <Box>
        <AppBar/>

      <div className="App"
           style={{
            display: 'flex',
            'flexDirection': 'row',
            'columnGap': '10px',
            'height': '93vh'
           }}
      >
          <Box sx={{
            "width": "50vw"
          }}>
            <Map />
            <DisplayToggle/>
            <Graph/>
          </Box>
          <Box sx={{
            "width": "50vw"
          }}>
            <EnsembleData/>

            <TableComponent/>

            <DistrictTableComponent/>
          </Box>
      </div>
      </Box>
    );
  }
}

export default App;
