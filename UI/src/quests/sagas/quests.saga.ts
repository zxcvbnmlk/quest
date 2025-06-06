import { call, put, takeLatest } from "redux-saga/effects";
import {AxiosResponse} from "axios";
import axios from '@src/_common/http/axiosInstance';
import {
    getQuestionsRequest, getQuestionsSuccess,
    getQuestsFailure,
    getQuestsRequest,
    getQuestsSuccess,
    questsFailure
} from "@src/quests/slices/quests.slice.ts";
import {quest} from "@src/quests/models/quests.ts";
function* getQuests() {
    try {
        const response: AxiosResponse<quest[]> = yield call(() =>
            axios.get(`/getQuests`)
        );
        yield put(getQuestsSuccess(response.data));
    } catch (error: any) {
        yield put(questsFailure(error.message));
    }
}
function* getQuestions() {
    try {
        const response: AxiosResponse<quest[]> = yield call(() =>
            axios.get(`/getQuestions`)
        );
        yield put(getQuestionsSuccess(response.data));
    } catch (error: any) {
        yield put(questsFailure(error.message));
    }
}

export default function* watchQuests() {
    yield takeLatest(getQuestsRequest.type, getQuests);
    yield takeLatest(getQuestionsRequest.type, getQuestions);
}
