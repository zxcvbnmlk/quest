import { call, put, takeLatest } from "redux-saga/effects";
import {AxiosResponse} from "axios";
import axios from '@src/_common/http/axiosInstance';
import {getQuestsFailure, getQuestsRequest, getQuestsSuccess} from "@src/quests/slices/quests.slice.ts";
import {quest} from "@src/quests/models/quests.ts";
function* getQuests() {
    try {
        const response: AxiosResponse<quest[]> = yield call(() =>
            axios.get(`/quests`)
        );
        yield put(getQuestsSuccess(response.data));
    } catch (error: any) {
        yield put(getQuestsFailure(error.message));
    }
}

export default function* watchQuests() {
    yield takeLatest(getQuestsRequest.type, getQuests);
}
