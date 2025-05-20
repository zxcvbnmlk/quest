import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {ChatState, Message, User} from "@src/chat/models/chat";

const initialState: ChatState = {
    users: [],
    messages: [],
    loading: false
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        connectSocket: () => {
        },
        disconnectSocket: () => {
        },
        sendMessage: (_state, _action: PayloadAction<string>) => {
        },
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        },
        addMessage: (state, action: PayloadAction<Message>) => {
            state.messages.push(action.payload);
        },
        setAllMessages: (state, action: PayloadAction<Message[]>) => {
            state.messages = action.payload;
        },
    },
});

export const {
    connectSocket,
    disconnectSocket,
    sendMessage,
    setUsers,
    addMessage,
    setAllMessages,
} = chatSlice.actions;
export const chatReducer = chatSlice.reducer;

