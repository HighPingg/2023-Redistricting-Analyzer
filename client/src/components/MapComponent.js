// Redux Imports
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedState } from '../reducers/MapReducer';

// Leaflet Imports
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import mapOverview from '../assets/geoJSON';

// Mui Imports
import { useRef } from 'react';


function Map() {
  const mapRef = useRef(null);
  const geojsonRef = useRef(null);

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
    layer.on({
      // On click, change selected state.  
      'click': function (event) {
        dispatch(setSelectedState(getName(feature)))

        const centerCoords = {"Ohio": [40.4173, -82.9071], "Nevada": [38.8026, -116.4194], "Illinois": [40.6331, -89.3985]};
        if (centerCoords[getName(feature)] != null)
          mapRef.current.flyTo(centerCoords[getName(feature)], 6);
      },

      // On hover, highlight
      'mouseover' : highlightFeature,
      'mouseout' : resetHighlight
    });
  }

  // Highlights the state that cursur is currently over.
  function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    layer.bringToFront();
  }

  // Resets the style currently set to the state.
  function resetHighlight(e) {
    geojsonRef.current.resetStyle(e.target);
  }

  return (
    <MapContainer ref={mapRef} style={{ width: "100%", height: "50vh" }} center={[37.6, -96]} zoom={5} scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON ref={geojsonRef} data={mapOverview} style={getColor} onEachFeature={onEachFeature} />
    </MapContainer>
  );
}

export default Map;