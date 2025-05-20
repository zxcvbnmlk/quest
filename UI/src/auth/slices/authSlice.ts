import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {authFormValues, credentials} from "@src/auth/models/auth.ts";



const initialState: credentials = {
    username: '',
    token: '',
    isLoading: true,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authRequest: (state, _action: PayloadAction<authFormValues>) => {
            state.isLoading = true;
        },
        authSuccess: (state, action: PayloadAction<credentials>) => {
            state.username = action.payload.username;
            state.token = action.payload.token;
            state.isLoading = false;


        },
        authFailure:  (state, action: PayloadAction<Error>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            localStorage.removeItem("credentials")
            state.username ='';
            state.token ='';
            state.isLoading = true;
        },

    }
});

export const {
    authRequest,
    authSuccess,
    authFailure,
    logout
} =  authSlice.actions;
export const authReducer = authSlice.reducer;
