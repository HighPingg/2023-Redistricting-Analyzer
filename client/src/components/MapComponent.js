import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import mapOverview from '../assets/geoJSON';

function Map() {
  return (
    <MapContainer  style={{ width: "100%", height: "50vh" }} center={[37.6, -96]} zoom={4} scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON data={mapOverview} />
    </MapContainer>
  );
}

export default Map;