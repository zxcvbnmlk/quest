import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@src/_redux/store.ts";
import {getUsersRequest} from "@src/users/slices/user.slice.ts";

export default function BuildQuests() {
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
                <h1>Создание квестов</h1>




            </>
        );
    }

}
