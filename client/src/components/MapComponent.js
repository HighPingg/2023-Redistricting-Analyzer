// Redux Imports
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedState } from '../reducers/MapReducer';

// Leaflet Imports
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Mui Imports
import { useRef } from 'react';
import { Box, IconButton } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';


function Map() {
  const mapRef = useRef(null);
  const geojsonRef = useRef(null);

  // Get map from MapReducer
  const map = useSelector(state => state.map);
  const dispatch = useDispatch();

  var getColor = (feature, selectedState) => {
    console.log(feature)

    if (selectedState === null) {
      return {color: feature.properties.color, weight: 1};
    } else {
      return {weight: 1};
    }
  }

  var getName = (feature) => {
    return feature.properties.name;
  }

  // Apply interactions to the map polygons
  var onEachFeature = (feature, layer, selectedState) => {
    if (selectedState === null) {
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
    } else {
      // When focused on a state, we want to instead display district info.
    }
  }

  // Reset the map to overview.
  var resetMap = (event) => {
    dispatch(setSelectedState(null));

    mapRef.current.flyTo([37.6, -96], 5);
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
    <Box>
      {
        // Hide reset button when no state is selected.
        map.selectedState !== null && <IconButton style={{left: '10px', top: '10px', position: 'absolute', zIndex: 1}}
                                                  onClick={resetMap}
                                                >
                                          <ReplayIcon style={{color: 'black'}}/>
                                      </IconButton>
      }

      <MapContainer zoomControl={false} ref={mapRef} style={{ width: "100%", height: "50vh", zIndex: 0 }} center={[37.6, -96]} zoom={5} scrollWheelZoom={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON key={map.selectedState}
                ref={geojsonRef}
                data={map.currentGeoJSON}
                style={(feature) => getColor(feature, map.selectedState)}
                onEachFeature={(feature, layer) => onEachFeature(feature, layer, map.selectedState)}
                />
      </MapContainer>
    </Box>
  );
}

export default Map;