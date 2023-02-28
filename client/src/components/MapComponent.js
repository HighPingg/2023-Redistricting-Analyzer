// Redux Imports
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentlyHovered, setSelectedDistrict, setSelectedState } from '../reducers/MapReducer';

// Leaflet Imports
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Mui Imports
import { useRef, useState } from 'react';
import { alpha, Box, FormControl, IconButton, InputLabel, MenuItem, Select, Tooltip } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';


function Map() {
  const mapRef = useRef(null);
  const geojsonRef = useRef(null);
  const captionRef = useRef(null);

  // Get map from MapReducer
  const map = useSelector(state => state.map);
  const dispatch = useDispatch();

  var getColor = (feature, selectedState) => {
    if (map.currentDistrict !== null && map.currentDistrict === feature.properties.DISTRICT) {
      return {fillColor: 'purple', color:'white', weight: 1, fillOpacity: 1};
    } else {
      return {fillColor: feature.properties.color, color:'white', weight: 1, fillOpacity: 0.8};
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
      // On districts bind click to select district.
      layer.on({
        'click': function (event) {
          dispatch(setSelectedDistrict(feature.properties.DISTRICT));
        },
        // On hover, highlight
        'mouseover' : highlightFeature,
        'mouseout' : resetHighlight
      })
    }
  }

  // Reset the map to overview.
  var resetMap = (event) => {
    dispatch(setSelectedState(null));

    mapRef.current.flyTo([37.6, -96], 5);
  }

  function setMap(state) {
    dispatch(setSelectedState(state));
    const centerCoords = {"Ohio": [40.4173, -82.9071], "Nevada": [38.8026, -116.4194], "Illinois": [40.6331, -89.3985]};
    if (centerCoords[state] != null){
      mapRef.current.flyTo(centerCoords[state], 6);
    }
    else{
      mapRef.current.flyTo([37.6, -96], 5);
    }
  }

  // Highlights the state that cursur is currently over.
  const highlightFeature = (e) => {
    // Call reducer to set state currently being hovered over.
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    layer.bringToFront();

    // Change caption info.
    var feature = layer.feature;

    if (map.selectedState === null) {
      captionRef.current.innerHTML =  `<span>
                                        <span style="font-weight: bold;" >${feature.properties.name}</span><br />
                                        ${feature.properties.density} people/mi<sup>2</sup>
                                      </span>`
    } else {
      captionRef.current.innerHTML =  `<span>
                                        <span style="font-weight: bold;" >District ${feature.properties.DISTRICT}</span><br />
                                        ${feature.properties.color}
                                      </span>`
    }
  }

  // Resets the style currently set to the state.
  function resetHighlight(e) {
    console.log(map.currentDistrict)
    if (map.currentDistrict === null || map.currentDistrict !== e.target.feature.properties.DISTRICT) {
      geojsonRef.current.resetStyle(e.target);
    }

    // Remove caption info.
    captionRef.current.innerHTML = null
  }

  var selectStateChange = (event) => {
    let state = event.target.value
    setMap(state);
  }

  

  return (
    <Box>

      <Box sx={{top:'1%', left:'.5%', display:'flex', position:'absolute', justifyContent: 'flex-start', zIndex: 1 }}>
        
      <Tooltip title="Select State" placement='right' arrow>
        <FormControl style={{backgroundColor:'white', minWidth:'100px'}}>
          
          {map.selectedState === null && 
          <InputLabel  id="state-select-label">State</InputLabel>
          }

          <Select
            labelId="state-select-label"
            id="select-state"
            value={map.selectedState}
            onChange={selectStateChange}
          >
            <MenuItem value={"Ohio"}>Ohio</MenuItem>
            <MenuItem value={"Illinois"}>Illinois</MenuItem>
            <MenuItem value={"Nevada"}>Nevada</MenuItem>

          </Select>
        </FormControl>
      </Tooltip>

      {
        // Hide reset button when no state is selected.
        map.selectedState !== null && <Tooltip title="Reset Map" placement='right' arrow>
                                        <IconButton onClick={resetMap}>
                                            <ReplayIcon style={{color: 'black'}}/>
                                        </IconButton>
                                      </Tooltip>
      }
      </Box>

      <MapContainer zoomControl={false} ref={mapRef} style={{ width: "100%", height: "50vh", zIndex: 0 }} center={[37.6, -96]} zoom={5} scrollWheelZoom={true}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON key={map.selectedState}
                ref={geojsonRef}
                data={map.currentGeoJSON}
                style={(feature) => getColor(feature, map.currentDistrict)}
                onEachFeature={(feature, layer) => onEachFeature(feature, layer, map.selectedState)}
                />
      </MapContainer>

      <div style={{right: '10px',
                   top: '10px',
                   padding: '10px',
                   position: 'absolute',
                   zIndex: 1,
                   backgroundColor: alpha('#E0E0E3', 0.5),
                   textAlign: 'left'
                  }}
           ref={captionRef}
        />
    
    </Box>
  );
}

export default Map;