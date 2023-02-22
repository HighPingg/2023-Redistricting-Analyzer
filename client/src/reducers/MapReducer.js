import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedState: null
}

export const mapReducer = createSlice({
    name: 'map', 
    initialState,
    reducers:{
        setSelectedState:(state, action) => {
            state.selectedState = action.payload
        }
    }
    }
)

export const {setSelectedState} = mapReducer.actions

export default mapReducer.reducer
