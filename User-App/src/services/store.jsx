// store.js
import { createStore } from 'redux';

// Initial state for movie, theatre, and show time
const initialState = {
  movie: null,
  theatre: null,
  selectedShow: null,
  selectedTime: null,
};

// Action types
const SET_MOVIE_DETAILS = 'SET_MOVIE_DETAILS';
const SET_THEATRE_DETAILS = 'SET_THEATRE_DETAILS';
const SET_SELECTED_SHOW_TIME = 'SET_SELECTED_SHOW_TIME';

// Action creators
export const setMovieDetails = (movie) => ({
  type: SET_MOVIE_DETAILS,
  payload: movie,
});

export const setTheatreDetails = (theatre) => ({
  type: SET_THEATRE_DETAILS,
  payload: theatre,
});

export const setSelectedShowTime = (showTime) => ({
  type: SET_SELECTED_SHOW_TIME,
  payload: showTime,
});

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MOVIE_DETAILS:
      return { ...state, movie: action.payload };
    case SET_THEATRE_DETAILS:
      return { ...state, theatre: action.payload };
    case SET_SELECTED_SHOW_TIME:
      return { ...state, selectedShow: action.payload.show, selectedTime: action.payload.time };
    default:
      return state;
  }
};

// Create the store
const store = createStore(reducer);

export default store;
