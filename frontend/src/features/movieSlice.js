import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    movie_id : null,
    movie_name : "",
    description : "",
    duration : "",
    genre : "",
    release_date : "",
    language : "",
};

const movieSlice = createSlice({
    name : "theatre",
    initialState,
    reducers : {
        saveMovie(state, action) {
            state.movie_id = action.payload.movie_id;
            state.movie_name = action.payload.movie_name;
            state.description = action.payload.description;
            state.duration = action.payload.duration;
            state.genre = action.payload.genre;
            state.release_date = action.payload.release_date;
            state.language = action.payload.language;
        },
    }
});

export const { saveMovie } = movieSlice.actions;

export default movieSlice.reducer;