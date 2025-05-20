import {call, put, take, takeLatest, select} from "redux-saga/effects";
import {
    addMessage,
    connectSocket,
    disconnectSocket,
    sendMessage,
    setUsers,
    setAllMessages,
} from "@src/chat/slices/chatSlice";
import {socketInit, getSocket, disconnectSocket as disconnect} from "@src/chat/services/socket";
import {eventChannel, SagaIterator} from "redux-saga";
import {RootState} from "@src/_redux/store.ts";
import {Message, User} from "@src/chat/models/chat.ts";

function* handleConnect(): SagaIterator {

    try {
        const { username, token } = yield select((state: RootState) => state.auth);


        const socket = yield call(socketInit, username, token);

        const channel = eventChannel(emitter => {
            socket.on("users", (users:User[]) => emitter({ type: "users", payload: users }));
            socket.on("message", (message: string) => emitter({ type: "message", payload: message }));
            socket.on("messageAll", (messages:Message[]) => emitter({ type: "all", payload: messages }));
            return () => socket.off();
        });
        let isConnected = true;
        while (isConnected) {
            const { type, payload } = yield take(channel);
            if (type === "users") yield put(setUsers(payload));
            if (type === "message") yield put(addMessage(payload));
            if (type === "all") yield put(setAllMessages(payload));
            if (type === "disconnect") isConnected = false;
        }

    } catch (error) {
        console.error("Ошибка при инициализации сокета:", error);
    }

}

function* handleSendMessage(action: ReturnType<typeof sendMessage>) {
    const socket = getSocket();
    socket.emit("message", action.payload);
}

function* handleDisconnect() {
    yield call(disconnect);
}

export function* chatSaga() {
    yield takeLatest(connectSocket.type, handleConnect);
    yield takeLatest(sendMessage.type, handleSendMessage);
    yield takeLatest(disconnectSocket.type, handleDisconnect);
}
