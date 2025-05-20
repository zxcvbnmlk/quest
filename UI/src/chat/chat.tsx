import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {connectSocket, disconnectSocket, sendMessage} from "@src/chat/slices/chatSlice.ts";
import {IconButton} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import {RootState} from "@src/_redux/store.ts";
import "./chat.scss";

export default function Chat() {
    const messages = useSelector((state: RootState) => state.chat.messages) ;
    const users = useSelector((state: RootState) => state.chat.users);
    const {token} = useSelector((state: RootState) => state.auth);
    const [newMessage, setNewMessage] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(connectSocket());
        return () => {
            dispatch(disconnectSocket());
        }

    }, [dispatch]);

    const handleSendClick = () => {
        dispatch(sendMessage(newMessage));
        setNewMessage("")
    };

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            sendMessage(newMessage);
        }
    };

    return (
        <>
            <div className="card chat-app">
                <div id="plist" className="people-list">
                    <ul className="list-unstyled chat-list">
                        {users.map((user) => (
                            <li
                                key={user.token}
                                className={`clearfix ${user.token === token ? "active" : ""}`}
                            >
                                <img src="/src/_assets/avatar1.png" alt="avatar"/>
                                <div className="about">
                                    <div className="name">{user.username}</div>
                                    <div className="status">
                                        <span className="online-dot"/> online
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="chat">
                    <div className="chat-history">
                        <ul className="m-b-0">
                            {messages.map((message, index) => (
                                <li key={index} className="clearfix">
                                    <div className="message-data">
                                        <span>{message.username}</span>
                                    </div>
                                    <div className="message other-message float-right">
                                        {message.text}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="chat-message clearfix">
                        <div className="input-group mb-0">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter text here..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyUp={handleKeyUp}
                            />
                            <IconButton onClick={handleSendClick}>
                                <SendIcon/>
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
