import { call, put, takeLatest } from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {getUsersFailure, getUsersRequest, getUsersSuccess} from "@src/users/slices/user.slice.ts";
import axios from '@src/_common/http/axiosInstance';
import {user} from "@src/_models/user.ts";
function* getUsers() {
    try {
        const response: AxiosResponse<user[]> = yield call(() =>
            axios.get(`/users`)
        );
        yield put(getUsersSuccess(response.data));
    } catch (error: any) {
        yield put(getUsersFailure(error.message));
    }
}

export default function* watchGetUsers() {
    yield takeLatest(getUsersRequest.type, getUsers);
}
