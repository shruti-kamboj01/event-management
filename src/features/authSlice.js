import { createSlice } from "@reduxjs/toolkit";

const initalState = {
    signupData: null,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null, 
}

const authSlice = createSlice({
    name: "auth",
    initalState: initalState,
    reducers:{
        setSignupData: (state, action) => {
            state.signupData = action.payload
        },
        setToken: (state, action) => {
            state.token = action.payload
        }
    }
})

export const {setSignupData, setToken} = authSlice.actions;
export default authSlice.reducer;