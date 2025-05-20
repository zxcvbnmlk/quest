import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import {searchReducer} from "@src/search/slices/searchSlice";
import watchSearchUsers from "@src/search/sagas/searchSaga";
import { all } from "redux-saga/effects";
import {chatReducer} from "@src/chat/slices/chatSlice.ts";
import {authReducer} from "@src/auth/slices/authSlice.ts";
import {chatSaga} from "@src/chat/sagas/chatSaga.ts";
import watchAuthUser from "@src/auth/sagas/authSaga.ts";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        auth: authReducer,
        search: searchReducer,
        chat: chatReducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
});

function* rootSaga() {
    yield all([
        watchAuthUser(),
        watchSearchUsers(),
        chatSaga()
    ]);
}

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
