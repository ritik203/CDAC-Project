import { createSlice } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

const initialState = {
    city_id : null,
    name : "",
    district : "",
    state : "",
    pincode : null
}

const citySlice = createSlice({
    name : "city",
    initialState,
    reducers : {
        saveCity : (state, action) => {
            state.city_id = action.payload.city_id;
            state.name = action.payload.name;
            state.district = action.payload.district;
            state.state = action.payload.state;
            state.pincode = action.payload.pincode;
        }
    }
});

export const { saveCity } = citySlice.actions;

export default citySlice.reducer;