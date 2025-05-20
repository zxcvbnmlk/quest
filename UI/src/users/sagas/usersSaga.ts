import { call, put, takeLatest } from "redux-saga/effects";
import axios, {AxiosResponse} from "axios";
import {getUsersFailure, getUsersRequest, getUsersSuccess} from "@src/users/slices/userSlice.ts";
import {API_LOCAL} from "@src/_env/env.ts";

function* getUsers() {
    try {
        const response: AxiosResponse<any> = yield call(() =>
            axios.get(`${API_LOCAL}api/users`)
        );
        console.log('response.data',response.data)
        yield put(getUsersSuccess(response.data));
    } catch (error: any) {
        yield put(getUsersFailure(error.message));
    }
}

export default function* watchGetUsers() {
    yield takeLatest(getUsersRequest.type, getUsers);
}
