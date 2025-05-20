export interface UserGit {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
}
export interface SearchRequest {
    q: string;
    page: number;
};
export interface SearchUsersAction {
    type: string;
    payload: SearchRequest;
}

export interface SearchState {
    users: UserGit[];
    loading: boolean;
    error: string | null;
    total_count: number

}

export interface GitHubResponse {
    incomplete_results: boolean,
    items: UserGit[],
    total_count: number
}
