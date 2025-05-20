export interface Message {
    text: string;
    username: string;
    date: string;
    token: string;
}

export interface User {
    userID: string;
    username: string;
    token: string;
}


export interface ChatState {
    users: User[];
    messages: Message[];
    loading: boolean;
}
