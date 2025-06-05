import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@src/_redux/store.ts";
import {getQuestsRequest} from "@src/quests/slices/quests.slice.ts";
import {quest} from "@src/_models/quests.ts";


export default function Quests() {
    const { quests, loading, error } = useSelector((state: RootState) => state.quests);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getQuestsRequest());

    }, [dispatch]);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;

    return (
        <>
            <h1>Выберите квест</h1>
            <div className={'quests-list'}>
                {quests.map((quest: quest) => (
                    <div className={'quest'} key={quest.id}>
                        <span className={'name'}>
                            {quest.name}
                        </span>
                        {/*<Button variant="text" onClick={() => console.log('вопросы')}>Открыть вопросы</Button>*/}
                        {/*<Button variant="contained" ></Button>*/}
                    </div>
                ))}
            </div>


        </>
    );

}
