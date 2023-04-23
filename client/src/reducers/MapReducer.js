// For reducers
import { createSlice } from "@reduxjs/toolkit";

// For MapComponent
import mapOverview from '../assets/geoJSON';

// For Graph Component
import graphingOverview from "../assets/graphData";

const initialState = {
    selectedState: null,
    currentGeoJSON: mapOverview,
    currentGraphData: null,
    currentDistrictPlan: '2022',
    currentDistrictsInfo: null,
    currentDistrict: null,
    currentDisplay: null,
    availableDistrictPlans: [],
    ensembleData: null,
    mapCenter: {"x": 37.6, "y": -96, "zoom": 5}
}

export const mapReducer = createSlice({
    name: 'map', 
    initialState,
    reducers: {
        setSelectedState: (state, action) => {
            state.currentDistrict = null;
            state.selectedState = action.payload.name;
            state.currentDistrictPlan = '2022';
            state.currentDisplay = null;

            switch (action.payload.name) {
                case "Illinois":
                    state.currentGraphData = graphingOverview.states.Illinois;
                    state.currentGeoJSON = action.payload.geoJSON;
                    state.availableDistrictPlans = action.payload.plans;
                    state.ensembleData = action.payload.ensemble;
                    state.mapCenter = action.payload.mapCenter;
                    state.currentDistrictsInfo = action.payload.districts;
                    break;
                
                case "Ohio":
                    state.currentGraphData = graphingOverview.states.Ohio;
                    state.currentGeoJSON = action.payload.geoJSON;
                    state.availableDistrictPlans = action.payload.plans;
                    state.ensembleData = action.payload.ensemble;
                    state.mapCenter = action.payload.mapCenter;
                    state.currentDistrictsInfo = action.payload.districts;
                    break;

                case "Nevada":
                    state.currentGraphData = graphingOverview.states.Nevada;
                    state.currentGeoJSON = action.payload.geoJSON;
                    state.availableDistrictPlans = action.payload.plans;
                    state.ensembleData = action.payload.ensemble;
                    state.mapCenter = action.payload.mapCenter;
                    state.currentDistrictsInfo = action.payload.districts;
                    break;
            
                default:
                    state.currentGeoJSON = mapOverview;
                    state.currentGraphData = null;
                    state.availableDistrictPlans = [];
                    state.ensembleData = null;
                    state.mapCenter = {"x": 37.6, "y": -96, "zoom": 5};
                    state.currentDistrictsInfo = null;
                    break;
            }
        },
        setSelectedDistrictPlan:(state, action) => {
            state.currentDistrictPlan = action.payload.planName;
            state.currentGeoJSON = action.payload.geoJSON;
            state.ensembleData = action.payload.ensemble;
            state.mapCenter = action.payload.mapCenter;
            state.currentDistrictsInfo = action.payload.districts;
        },
        setSelectedDistrict:(state, action) => {
            state.currentDistrict = action.payload;
        },
        setSelectedDisplay:(state, action) => {
            state.currentDisplay = action.payload;
        }
    }
})

export const {setSelectedState, setCurrentGeoJSON, setSelectedDistrictPlan, setSelectedYear, setSelectedDistrict, setSelectedDisplay} = mapReducer.actions;

export default mapReducer.reducer;
