import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {authFormValues, credentials} from "@src/auth/models/auth.ts";



const initialState: credentials = {
    login: '',
    username: '',
    token: '',
    role: '',
    isLoading: true,
    reg: false,

};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authRequest: (state, _action: PayloadAction<authFormValues>) => {
            state.isLoading = true;
            delete state.error
        },
        regRequest: (state, _action: PayloadAction<authFormValues>) => {
            state.isLoading = true;
            delete state.error
        },
        regSuccess: (state, action: PayloadAction<any>) => {
            console.log("regSuccess", action.payload);
            state.success = { message: action.payload.data};
            state.isLoading = false;
            state.reg = false
        },
        authSuccess: (state, action: PayloadAction<credentials>) => {
            state.username = action.payload.username;
            state.token = action.payload.token;
            state.role = action.payload.role;
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
            state.isLoading = false;
            state.reg = false
        },
        toggleReg:  (state) => {
            state.reg =  !state.reg;
        },

    }
});

export const {
    authRequest,
    authSuccess,
    regRequest,
    regSuccess,
    authFailure,
    logout,
    toggleReg
} =  authSlice.actions;
export const authReducer = authSlice.reducer;
