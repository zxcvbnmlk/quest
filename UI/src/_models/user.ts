

export interface quests {
    id: string,
    name: string,
    step: number
}

export interface user {
    id: string,
    login: string,
    username: string,
    role: string,
    quests?: quests[]
}


