// store/index.js

import { createStore, combineReducers } from 'redux';
import movieReducer from './reducers/movieReducer';

// Combine reducers
const rootReducer = combineReducers({
  movie: movieReducer,
});

// Create Redux store
const store = createStore(rootReducer);

export default store;
