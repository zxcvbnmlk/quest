import { call, put, takeLatest } from "redux-saga/effects";
import axios, {AxiosResponse} from "axios";
import {authFailure, authRequest, authSuccess, regRequest, regSuccess} from "@src/auth/slices/authSlice.ts";
import {authUsersAction, credentials, regUsersAction} from "@src/auth/models/auth.ts";
import {API_LOCAL} from "@src/_env/env.ts";

function* authUser(action: authUsersAction) {
    try {
        const response: AxiosResponse<credentials> = yield call(() =>
            axios.post(`${API_LOCAL}api/auth`,{
                login: action.payload.login,
                password: action.payload.password,
            })
        );
        localStorage.setItem("credentials", JSON.stringify({
            login: response.data.login,
            username: response.data.username,
            token: response.data.token,
        }));
        yield put(authSuccess(response.data));
    } catch (error: any) {
        yield put(authFailure(error.response.data.message));
    }
}
function* regUser(action: regUsersAction) {
    try {
        const response: AxiosResponse<credentials> = yield call(() =>
            axios.post(`${API_LOCAL}api/addUser`,{
                login: action.payload.login,
                username: action.payload.username,
                password: action.payload.password,
            })
        );
        yield put(regSuccess(response));
    } catch (error: any) {
        yield put(authFailure(error));
    }
}
export default function* watchAuthUser() {
    yield takeLatest(authRequest.type, authUser);
    yield takeLatest(regRequest.type, regUser);
}
