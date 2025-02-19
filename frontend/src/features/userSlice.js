import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    id : null,
    name : "",
    email : "",
    mobile : "",
    role : "user",
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers : {
        onAuthenticate(state, action) {
            state.id = action.payload.user_id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.mobile = action.payload.mobile;
            state.role = action.payload.role;
        },
    }
});

export const { onAuthenticate } = userSlice.actions;

export default userSlice.reducer;