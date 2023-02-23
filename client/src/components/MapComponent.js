import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import mapOverview from '../assets/geoJSON';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';

function Map() {
  // Get map from MapReducer
  const map = useSelector(state => state.map);

  var getColor = (feature) => {
    return {color: feature.properties.color, weight: 1};
  }

  return (
    <MapContainer  style={{ width: "100%", height: "50vh" }} center={[37.6, -96]} zoom={5} scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON data={mapOverview} style={getColor} onEachFeature={() => console.log("FUCK")} />
    </MapContainer>
  );
}

export default Map;