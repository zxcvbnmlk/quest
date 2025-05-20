
export interface credentials {
    username:string,
    token: string,
    isLoading: boolean,
    error?: Error,
};

export interface authFormValues {
    username: string;
    password: string;
};
export interface authUsersAction {
    type: string;
    payload: authFormValues;
}
