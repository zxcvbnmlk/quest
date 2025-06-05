import { createSlice, PayloadAction } from "@reduxjs/toolkit";


// name : '',
//     description : '',
//     image : '',
//     start : '',
//     price : 0,
//     duration : 0,
//     questions : []

const initialState: any = {
    quests : [],
};
// const loading = false
// initialState: {initialState, loading},
const questsSlice = createSlice({
    name: "quests",
    initialState,
    reducers: {
        getQuestsRequest: (state) => {
            // state.loading = true;
            console.log('state', state);
        },
        getQuestsSuccess: (state, action: PayloadAction<any>) => {
            console.log('getQuestsSuccess action.payload', action.payload);
            // state.loading = false;
            state.quests = action.payload;
        },
        getQuestsFailure: (state, action: PayloadAction<string>) => {
            // state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
    getQuestsRequest,
    getQuestsSuccess,
    getQuestsFailure
} =  questsSlice.actions;
export const questsReducer = questsSlice.reducer;
