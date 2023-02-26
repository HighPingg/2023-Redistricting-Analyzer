import './App.css';

import Map from './components/MapComponent';
import ControlButtons from './components/ControlButtons'
import Graph from './components/GraphComponent';

function App() {
  return (
    <div className="App">
      <Map />
      <ControlButtons/>
      <Graph/>
    </div>
  );
}

export default App;
