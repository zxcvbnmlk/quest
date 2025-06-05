import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: any = {
    quests: [],
    loading: false,
    error: null,
};

const buildQuestsSlice = createSlice({
    name: "quests",
    initialState,
    reducers: {
        getQuestsRequest: (state) => {
            state.loading = true;
        },
        getQuestsSuccess: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.users = action.payload;
        },
        getQuestsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
    getQuestsRequest,
    getQuestsSuccess,
    getQuestsFailure
} =  buildQuestsSlice.actions;
export const usersReducer = buildQuestsSlice.reducer;
