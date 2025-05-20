import { useSelector } from "react-redux";
import { RootState } from "@src/_redux/store";

export default function UserList() {
    const { users, loading, error } = useSelector((state: RootState) => state.search);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;

    return (
        <ul>
            {users.map((user) => (
                <li key={user.id}>
                    <img src={user.avatar_url} alt={user.login} width="50" />
                    <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                        {user.login}
                    </a>
                </li>
            ))}
        </ul>
    );
}
