import SearchForm from "@src/search/components/SearchForm";
import UserList from "@src/search/components/UserList.tsx";

export default function Search() {
    return (
        <>
            <h1>Поиск пользователей в GitHub</h1>
            <SearchForm />
            <UserList />
        </>
    );
}
