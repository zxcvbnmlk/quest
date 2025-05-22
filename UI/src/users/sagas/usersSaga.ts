import { call, put, takeLatest } from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {getUsersFailure, getUsersRequest, getUsersSuccess} from "@src/users/slices/userSlice.ts";
import axios from '@src/_common/http/axiosInstance';
function* getUsers() {
    try {
        const response: AxiosResponse<any> = yield call(() =>
            axios.get(`/users`)
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
