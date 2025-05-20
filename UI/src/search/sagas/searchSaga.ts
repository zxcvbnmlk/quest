import { call, put, takeLatest } from "redux-saga/effects";
import axios, {AxiosResponse} from "axios";
import {SearchUsersAction, GitHubResponse} from "@src/search/models/search.ts"
import {API_GITHUB, per_page} from "@src/search/constants"
import {searchUsersFailure, searchUsersRequest, searchUsersSuccess} from "@src/search/slices/searchSlice";

function* fetchGitHubUsers(action: SearchUsersAction) {
    try {
        const response: AxiosResponse<GitHubResponse> = yield call(() =>
            axios.get(`${API_GITHUB}?q=${action.payload.q}&page=${action.payload.page}&per_page=${per_page}`)
        );
        yield put(searchUsersSuccess(response.data));
    } catch (error: any) {
        yield put(searchUsersFailure(error.message));
    }
}

export default function* watchSearchUsers() {
    yield takeLatest(searchUsersRequest.type, fetchGitHubUsers);
}
