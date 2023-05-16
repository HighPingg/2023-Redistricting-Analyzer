// For reducers
import { createSlice } from "@reduxjs/toolkit";

// For MapComponent
import mapOverview from '../assets/geoJSON';

// For Graph Component
import graphingOverview from "../assets/graphData";

// Import geojsons
import IL_HIGH_POP from "../assets/GeoJSON/Illinois_High_Pop"
import IL_HIGH_GEO from "../assets/GeoJSON/Illinois_Highest_GeoVar_of_0.5615"
import OH_HIGH_POP from "../assets/GeoJSON/Ohio_Highest_PopVar_of_0.49225"
import OH_HIGH_GEO from "../assets/GeoJSON/Ohio_Highest_GeoVar_of_0.5349375000000001"
import NV_HIGH_POP from "../assets/GeoJSON/Nevada_Highest_PopVar_of_0.5"
import NV_HIGH_GEO from "../assets/GeoJSON/Nevada_Highest_GeoVar_of_0.618"

const initialState = {
    selectedState: null,
    currentGeoJSON: mapOverview,
    currentDistrictPlan: '2022',
    currentDistrictsInfo: null,
    currentDistrict: null,
    currentDisplay: null,
    availableDistrictPlans: [],
    ensembleData: null,
    mapCenter: {"x": 37.6, "y": -96, "zoom": 5},
    incumbentTable: null,
    selectedEnsembleToggle: "ensemble",
    currentRacialData: 'population',
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
            state.selectedEnsembleToggle = 'ensemble';

            switch (action.payload.name) {
                case "Illinois":
                    state.currentGeoJSON = action.payload.geoJSON;
                    state.availableDistrictPlans = action.payload.plans;
                    state.ensembleData = action.payload.ensemble;
                    state.mapCenter = action.payload.mapCenter;
                    state.currentDistrictsInfo = action.payload.districts;
                    state.incumbentTable = action.payload.incumbentTable;
                    break;
                
                case "Ohio":
                    state.currentGeoJSON = action.payload.geoJSON;
                    state.availableDistrictPlans = action.payload.plans;
                    state.ensembleData = action.payload.ensemble;
                    state.mapCenter = action.payload.mapCenter;
                    state.currentDistrictsInfo = action.payload.districts;
                    state.incumbentTable = action.payload.incumbentTable;
                    break;

                case "Nevada":
                    state.currentGeoJSON = action.payload.geoJSON;
                    state.availableDistrictPlans = action.payload.plans;
                    state.ensembleData = action.payload.ensemble;
                    state.mapCenter = action.payload.mapCenter;
                    state.currentDistrictsInfo = action.payload.districts;
                    state.incumbentTable = action.payload.incumbentTable;
                    break;
            
                default:
                    state.currentGeoJSON = mapOverview;
                    state.availableDistrictPlans = [];
                    state.ensembleData = null;
                    state.mapCenter = {"x": 37.6, "y": -96, "zoom": 5};
                    state.currentDistrictsInfo = null;
                    state.incumbentTable = null;
                    break;
            }
        },
        setSelectedDistrictPlan:(state, action) => {
            state.currentDistrictPlan = action.payload.planName;
            if (action.payload.planName == '2020')
                state.currentRacialData = null;
            switch (state.selectedState) {
                case 'Illinois':
                    switch (action.payload.planName) {
                        case 'Most Geometric Variation':
                            state.currentGeoJSON = IL_HIGH_GEO;
                            break;
                        case 'Most Population Variation':
                            state.currentGeoJSON = IL_HIGH_POP;
                            break;
                        
                        default:
                            state.currentGeoJSON = action.payload.geoJSON;
                            break;
                    }
                    break;
                
                case 'Ohio':
                    switch (action.payload.planName) {
                        case 'Highest Geographic Variation':
                            state.currentGeoJSON = OH_HIGH_GEO;
                            break;
                        case 'Highest Population Variation':
                            state.currentGeoJSON = OH_HIGH_POP;
                            break;
                        
                        default:
                            state.currentGeoJSON = action.payload.geoJSON;
                            break;
                    }
                    break;

                case 'Nevada':
                    switch (action.payload.planName) {
                        case 'Most Geometric Variation':
                            state.currentGeoJSON = NV_HIGH_GEO;
                            break;
                        case 'Most Population Variation':
                            state.currentGeoJSON = NV_HIGH_POP;
                            break;
                        
                        default:
                            state.currentGeoJSON = action.payload.geoJSON;
                            break;
                    }
                    break;
                        
                default:
                    break;
            }
            state.ensembleData = action.payload.ensemble;
            state.mapCenter = action.payload.mapCenter;
            state.currentDistrictsInfo = action.payload.districts;
            state.currentDisplay = null;
        },
        setSelectedDistrict:(state, action) => {
            state.currentDistrict = action.payload;
        },
        setSelectedDisplay:(state, action) => {
            state.currentDisplay = action.payload;
        },
        setSelectedEnsembleToggle:(state, action) => {
            state.selectedEnsembleToggle = action.payload;
            console.log(action.payload)
        },
        setSelectedRacialData:(state ,action) => {
            state.currentRacialData = action.payload;
            console.log(action.payload);
        }
    }
})

export const {setSelectedState, setCurrentGeoJSON, setSelectedDistrictPlan, setSelectedYear, setSelectedDistrict, setSelectedDisplay, setSelectedEnsembleToggle, setSelectedRacialData} = mapReducer.actions;

export default mapReducer.reducer;
