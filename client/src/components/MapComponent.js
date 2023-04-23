// Redux Imports
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentlyHovered, setSelectedDistrict, setSelectedState } from '../reducers/MapReducer';

// Leaflet Imports
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Mui Imports
import { useRef, useState } from 'react';
import { alpha, Box, FormControl, IconButton, InputLabel, MenuItem, Select, Tooltip} from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';

// Component imports
import DistrictPlanToggle from './DistrictPlanToggleComponent';

function Map() {
  const mapRef = useRef(null);
  const geojsonRef = useRef(null);
  const captionRef = useRef(null);

  // Get map from MapReducer
  const map = useSelector(state => state.map);
  const dispatch = useDispatch();

  var getColor = (feature, selectedState) => {
    if (map.currentDistrict !== null && map.currentDistrict === feature.properties.DISTRICT) {
      return {
        fillColor: 'purple',
        color:'white',
        weight: 1,
        fillOpacity: 1
      };
    } else {
      return {
        fillColor: feature.properties.color,
        color:'white',
        weight: 1,
        fillOpacity: 0.8
      };
    }
  }

  var handleSetSelectedState = (name) => {
    // Switch state code
    let selectedState = null;
    switch (name) {
      case "Illinois":
        selectedState = 'IL';
        break;
      
      case "Ohio":
        selectedState = 'OH';
        break;

      case "Nevada":
        selectedState = 'NV';
        break;
    }

    // If we're not resetting, then we want to fetch the state GeoJSON as well.
    if (selectedState !== null) {
      fetch("http://localhost:8080/districtPlan/" + selectedState + "/2022", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
      })
        .then((response) => response.text())
        .then((data) => {
          
          // Fetch all available district plans from the new selected state
          fetch("http://localhost:8080/availablePlans/" + selectedState, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
          })
            .then((response) => response.text())
            .then((plans) => {
              let districtPlan = JSON.parse(data);

              dispatch(setSelectedState({
                "name": name,
                "geoJSON": districtPlan.geoJson,
                "plans": JSON.parse(plans),
                "ensemble": districtPlan.ensemble,
                "mapCenter": districtPlan.geoJSONCenter,
                "districts": districtPlan.districts
              }));
            });
        });

    // Otherwise just use the default view.
    } else {
      dispatch(setSelectedState({"name": null}));
    }
  }

  // Apply interactions to the map polygons
  var onEachFeature = (feature, layer, selectedState) => {
    if (selectedState === null) {
      // Bind click to zoom in on state.
      layer.on({
        // On click, change selected state.  
        'click': (event) => handleSetSelectedState(feature.properties.name),

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

  // Highlights the state that cursur is currently over.
  const highlightFeature = (e) => {
    // Call reducer to set state currently being hovered over.
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        fillOpacity: 1
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
    geojsonRef.current.setStyle({
      weight: 1,
      color: "white",
      fillOpacity: 0.8
    })

    // Remove caption info.
    captionRef.current.innerHTML = null
  }


  return (
    <Box>
      <MapContainer key={map.selectedState + map.currentDistrictPlan}
                    zoomControl={false}
                    ref={mapRef}
                    style={{ width: "100%", height: map.selectedState === null ? '100vh' : '50vh', zIndex: 0 }}
                    center={[map.mapCenter.x, map.mapCenter.y]}
                    zoom={map.mapCenter.zoom}
                    scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON key={map.selectedState}
                ref={geojsonRef}
                data={map.currentGeoJSON}
                style={(feature) => getColor(feature, map.currentDistrict)}
                onEachFeature={(feature, layer) => onEachFeature(feature, layer, map.selectedState)}
                />
        <Box sx={{top:'1%', left:'.5%', display:'flex', flexDirection:'column', position:'absolute', alignItems:'left', justifyContent: 'left', zIndex: 1000}}>
          <Box>
            <Tooltip title="Select State" placement='right' arrow>
              <FormControl style={{backgroundColor:'white', minWidth:'100px'}}>
                
                {map.selectedState === null && 
                <InputLabel  id="state-select-label">State</InputLabel>
                }

                <Select
                  labelId="state-select-label"
                  id="select-state"
                  value={map.selectedState}
                  onChange={(event) => handleSetSelectedState(event.target.value)}
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
                                            <IconButton onClick={() => handleSetSelectedState(null)}>
                                                <ReplayIcon style={{color: 'black'}}/>
                                            </IconButton>
                                          </Tooltip>
          }
          </Box>

          <DistrictPlanToggle/>
        </Box>

        <div style={{right: '10px',
                    top: '10px',
                    padding: '10px',
                    position: 'absolute',
                    zIndex: 1000,
                    backgroundColor: alpha('#E0E0E3', 0.5),
                    textAlign: 'left'
                  }}
            ref={captionRef}
        />
      </MapContainer>
    </Box>
  );
}

export default Map;