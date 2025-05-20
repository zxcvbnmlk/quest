import { io, Socket } from 'socket.io-client';
import {API_LOCAL} from "@src/_env/env.ts";

let socket: Socket;

export const socketInit = (username: string, token: string): Socket => {
    socket = io(API_LOCAL, {
        query: { username, token },
    });
    return socket;
};

export const getSocket = (): Socket => {
    if (!socket) throw new Error("Socket is not initialized");
    return socket;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
    }
};
