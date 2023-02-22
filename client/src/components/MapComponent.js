import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMap } from 'react-leaflet/hooks'
import { Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'

import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';

function Map() {
  //Get map from MapReducer
  const map = useSelector(state => state.map)

  return (
    <MapContainer  style={{ width: "100%", height: "50vh" }} center={[37.6, -95.665]} zoom={5} scrollWheelZoom={true}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}

export default Map;