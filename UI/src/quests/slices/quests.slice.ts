import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {authFormValues} from "@src/auth/models/auth.ts";


// name : '',
//     description : '',
//     image : '',
//     start : '',
//     price : 0,
//     duration : 0,
//     questions : []

const initialState: any = {
    quests : [],
    questions : [],
    success: false
};
// const loading = false
// initialState: {initialState, loading},
const questsSlice = createSlice({
    name: "quests",
    initialState,
    reducers: {
        getQuestsRequest: (state) => {
            // state.loading = true;
            // console.log('state', state);
        },
        getQuestsSuccess: (state, action: PayloadAction<any>) => {
            // console.log('getQuestsSuccess action.payload', action.payload);
            // state.loading = false;
            state.quests = action.payload;
        },
        questsFailure: (state, action: PayloadAction<string>) => {
            // state.loading = false;
            state.error = action.payload;
        },
        getQuestionsRequest: (state, _action: PayloadAction<any>) => {
            // state.loading = true;
            // console.log('state', state);
        },
        getQuestionsSuccess: (state, action: PayloadAction<any>) => {
            console.log('getQuestsSuccess action.payload', action.payload);
            // state.loading = false;
            state.questions = action.payload;
        },
        putQuestionsRequest: (state, _action: PayloadAction<any>) => {
            // state.loading = true;
            // console.log('state', state);
        },
        putQuestionsSuccess: (state, action: PayloadAction<any>) => {
            console.log('putQuestionsSuccess state.success', action.payload);
            // state.loading = false;
            state.success = true;
        },
        putQuestRequest: (state, _action: PayloadAction<any>) => {
            // state.loading = true;
            // console.log('state', state);
        },
        putQuestSuccess: (state, action: PayloadAction<any>) => {
            console.log('putQuestionsSuccess state.success', action.payload);
            // state.loading = false;
            state.success = true;
        },
        clear: (state) => {
            // state.loading = false;
            state.questions = [];
            state.success = false;
        },

    }
});

export const {
    getQuestsRequest,
    getQuestsSuccess,
    questsFailure,
    getQuestionsRequest,
    getQuestionsSuccess,
    putQuestionsRequest,
    putQuestionsSuccess,
    clear,
    putQuestRequest,
    putQuestSuccess

} =  questsSlice.actions;
export const questsReducer = questsSlice.reducer;
