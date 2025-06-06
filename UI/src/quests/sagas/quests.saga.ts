import { call, put, takeLatest } from "redux-saga/effects";
import {AxiosResponse} from "axios";
import axios from '@src/_common/http/axiosInstance';
import {
    getQuestionsRequest, getQuestionsSuccess,
    getQuestsRequest,
    getQuestsSuccess, putQuestionsRequest, putQuestionsSuccess, putQuestRequest,
    questsFailure
} from "@src/quests/slices/quests.slice.ts";
import {quest, questAction} from "@src/quests/models/quests.ts";
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
function* getQuestions(action: questAction) {
    try {
        const response: AxiosResponse<[]> = yield call(() =>
            axios.post(`/getQuestions`,{
                questions: action.payload,
            })
        );
        yield put(getQuestionsSuccess(response.data));
    } catch (error: any) {
        yield put(questsFailure(error.message));
    }
}

function* putQuestions(action: questAction) {
    try {
        const response: AxiosResponse<[]> = yield call(() =>
            axios.put(`/putQuestions`,{
                questions: action.payload,
            })
        );
        yield put(putQuestionsSuccess(response.data));
    } catch (error: any) {
        yield put(questsFailure(error.message));
    }
}

function* putQuest(action: questAction) {
    try {
        const response: AxiosResponse<[]> = yield call(() =>
            axios.put(`/putQuest`,{
                quest: action.payload,
            })
        );
        yield put(getQuestsRequest());
        yield put(putQuestionsSuccess(response.data));
    } catch (error: any) {
        yield put(questsFailure(error.message));
    }
}

export default function* watchQuests() {
    yield takeLatest(getQuestsRequest.type, getQuests);
    yield takeLatest(getQuestionsRequest.type, getQuestions);
    yield takeLatest(putQuestionsRequest.type, putQuestions);
    yield takeLatest(putQuestRequest.type, putQuest);
}
