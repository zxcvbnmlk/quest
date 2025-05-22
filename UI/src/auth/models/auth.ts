
export interface credentials {
    login: string,
    username:string,
    token: string,
    isLoading?: boolean,
    role: string
    error?: Error,
    success?: {
        message: string,
    },
    reg?: boolean
};

export interface authFormValues {
    login: string;
    password: string;
};
export interface regFormValues {
    login: string;
    password: string;
    confirmPassword: string;
    username: string;
};
export interface authUsersAction {
    type: string;
    payload: authFormValues;
}
export interface regUsersAction {
    type: string;
    payload: regFormValues;
}
