// For reducers
import { createSlice } from "@reduxjs/toolkit";

// For MapComponent
import mapOverview from '../assets/geoJSON';
import illinois21Map from '../assets/illinois_21';
import ohio21Map from '../assets/ohio_21';
import nevada21Map from '../assets/nevada_21';

// For Graph Component
import graphingOverview from "../assets/graphData";

const initialState = {
    selectedState: null,
    currentGeoJSON: mapOverview,
    currentGraphData: null,
    currentYear: '2022'
}

export const mapReducer = createSlice({
    name: 'map', 
    initialState,
    reducers: {
        setSelectedState: (state, action) => {
            state.selectedState = action.payload;

            switch (action.payload) {
                case "Illinois":
                    state.currentGeoJSON = illinois21Map;
                    state.currentGraphData = graphingOverview.states.Illinois
                    break;
                
                case "Ohio":
                    state.currentGeoJSON = ohio21Map;
                    state.currentGraphData = graphingOverview.states.Ohio
                    break;

                case "Nevada":
                    state.currentGeoJSON = nevada21Map;
                    state.currentGraphData = graphingOverview.states.Nevada
                    break;
            
                default:
                    state.currentGeoJSON = mapOverview;
                    state.currentGraphData = null;
                    break;
            }
        },
        setSelectedYear:(state, action) => {
            state.currentYear = action.payload

            // switch(action.payload) {  TODO if we need other stuff to change.
            //     case '2020':
            // 
            //          break;
            //     case '2022':
            // }
        }
    }
})

export const {setSelectedState, setSelectedYear} = mapReducer.actions

export default mapReducer.reducer
