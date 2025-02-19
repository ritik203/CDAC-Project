import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    theatre_id : null,
    name : "",
    no_of_screens : null,
    theatre_admin_id : null,
};

const theatreSlice = createSlice({
    name : "theatre",
    initialState,
    reducers : {
        saveTheatre(state, action) {
            state.theatre_id = action.payload.theatre_id;
            state.name = action.payload.name;
            state.no_of_screens = action.payload.no_of_screens;
            state.theatre_admin_id = action.payload.theatre_admin_id;
        },
    }
});

export const { saveTheatre } = theatreSlice.actions;

export default theatreSlice.reducer;