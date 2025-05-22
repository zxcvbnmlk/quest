import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: any = {
    users: [],
    loading: false,
    error: null,
};

const buildQuestsSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        getUsersRequest: (state) => {
            state.loading = true;
        },
        getUsersSuccess: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.users = action.payload;
        },
        getUsersFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
    getUsersRequest,
    getUsersSuccess,
    getUsersFailure
} =  buildQuestsSlice.actions;
export const usersReducer = buildQuestsSlice.reducer;
