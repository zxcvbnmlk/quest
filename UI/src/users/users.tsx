import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@src/_redux/store.ts";
import {getUsersRequest} from "@src/users/slices/userSlice.ts";

export default function Users() {
    const { users, loading, error } = useSelector((state: RootState) => state.users);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUsersRequest());

    }, [dispatch]);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;
    if (users) {
        return (
            <>
                <h1>Клиенты</h1>

                <ul  className={'users-list'}>
                    {users.map((user: any) => (
                        <li key={user.id}>
                            <span className={'login'}>
                                {user.login}
                            </span>
                            &nbsp;|&nbsp;
                            <span className={'login'}>
                                {user.username}
                            </span>
                        </li>
                    ))}
                </ul>

            </>
        );
    }

}
