// Redux Imports
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedState } from '../reducers/MapReducer';

//Leaflet Imports
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import mapOverview from '../assets/geoJSON';

// Mui Imports
import Box from '@mui/material/Box';


function Map() {
  // Get map from MapReducer
  const map = useSelector(state => state.map);
  const dispatch = useDispatch();

  var getColor = (feature) => {
    return {color: feature.properties.color, weight: 1};
  }

  var getName = (feature) => {
    return feature.properties.name;
  }

  var onEachFeature = (feature, layer) => {
    // Bind click to zoom in on state.
    layer.on(
        //On click, change selected state.  
      'click', function (event) {
      console.log(getName(feature))
      dispatch(setSelectedState(getName(feature)))
    
    });
  }

  return (
    <MapContainer  style={{ width: "100%", height: "50vh" }} center={[37.6, -96]} zoom={5} scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON data={mapOverview} style={getColor} onEachFeature={onEachFeature} />
    </MapContainer>
  );
}

export default Map;