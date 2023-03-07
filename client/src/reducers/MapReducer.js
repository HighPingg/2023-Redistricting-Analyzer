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
    currentYear: '2022',
    currentDistrict: null,
    currentDisplay:null
}

export const mapReducer = createSlice({
    name: 'map', 
    initialState,
    reducers: {
        setSelectedState: (state, action) => {
            state.currentDistrict = null;
            state.selectedState = action.payload;
            state.currentYear = '2022';
            state.currentDisplay = null;

            switch (action.payload) {
                case "Illinois":
                    state.currentGraphData = graphingOverview.states.Illinois;
                    break;
                
                case "Ohio":
                    state.currentGraphData = graphingOverview.states.Ohio;
                    break;

                case "Nevada":
                    state.currentGraphData = graphingOverview.states.Nevada;
                    break;
            
                default:
                    state.currentGeoJSON = mapOverview;
                    state.currentGraphData = null;
                    break;
            }
        },
        setCurrentGeoJSON:(state, action) => {
            state.currentGeoJSON = action.payload;
        },
        setSelectedYear:(state, action) => {
            state.currentYear = action.payload;
        },
        setSelectedDistrict:(state, action) => {
            state.currentDistrict = action.payload;
        },
        setSelectedDisplay:(state, action) => {
            state.currentDisplay = action.payload;
        }
    }
})

export const {setSelectedState, setCurrentGeoJSON, setSelectedYear, setSelectedDistrict, setSelectedDisplay} = mapReducer.actions;

export default mapReducer.reducer;
