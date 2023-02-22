import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMap } from 'react-leaflet/hooks'
import { Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'

import Box from '@mui/material/Box';

function Map() {
  return (
    <Box
        sx={{width: 1/3}} >
    <MapContainer  style={{ width: "100%", height: "100vh" }} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
    </Box>
  );
}

export default Map;