import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import cityReducer from "./features/citySlice";
import movieReducer from "./features/movieSlice";

const store = configureStore({
   reducer : {
    user : userReducer,
    city : cityReducer,
    movie : movieReducer,
   }
});

export { store };