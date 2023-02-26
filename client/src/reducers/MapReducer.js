import { createSlice } from "@reduxjs/toolkit";

import mapOverview from '../assets/geoJSON';
import illinois21Map from '../assets/illinois_21';
import ohio21Map from '../assets/ohio_21';
import nevada21Map from '../assets/nevada_21';

const initialState = {
    selectedState: null,
    currentGeoJSON: mapOverview
}

export const mapReducer = createSlice({
    name: 'map', 
    initialState,
    reducers: {
        setSelectedState:(state, action) => {
            state.selectedState = action.payload

            switch (action.payload) {
                case "Illinois":
                    state.currentGeoJSON = illinois21Map;
                    break;
                
                case "Ohio":
                    state.currentGeoJSON = ohio21Map;
                    break;

                case "Nevada":
                    state.currentGeoJSON = nevada21Map;
                    break;
            
                default:
                    state.currentGeoJSON = mapOverview;
                    break;
            }
        }
    }
})

export const {setSelectedState} = mapReducer.actions

export default mapReducer.reducer
