import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import {authReducer} from "@src/auth/slices/authSlice.ts";
import watchAuthUser from "@src/auth/sagas/authSaga.ts";
import {usersReducer} from "@src/users/slices/user.slice.ts";
import watchGetUsers from "@src/users/sagas/users.saga.ts";
import {questsReducer} from "@src/quests/slices/quests.slice.ts";
import watchQuests from "@src/quests/sagas/quests.saga.ts";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        quests: questsReducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
});

function* rootSaga() {
    yield all([
        watchAuthUser(),
        watchGetUsers(),
        watchQuests(),
    ]);
}

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
