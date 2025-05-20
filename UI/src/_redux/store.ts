import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import {authReducer} from "@src/auth/slices/authSlice.ts";
import watchAuthUser from "@src/auth/sagas/authSaga.ts";
import {usersReducer} from "@src/users/slices/userSlice.ts";
import watchGetUsers from "@src/users/sagas/usersSaga.ts";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
});

function* rootSaga() {
    yield all([
        watchAuthUser(),
        watchGetUsers()
    ]);
}

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
