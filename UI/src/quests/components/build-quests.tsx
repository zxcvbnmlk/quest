import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@src/_redux/store.ts";
import {getQuestionsRequest, getQuestsRequest} from "@src/quests/slices/quests.slice.ts";
import {quest} from "@src/_models/quests.ts";
import './build-quests.scss';
import { Button } from "@mui/material";

export default function BuildQuests() {
    const { quests, loading, error, questions } = useSelector((state: RootState) => state.quests);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getQuestsRequest());
        console.log('quests',quests)

    }, [dispatch]);
    
    

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;

    function getQuestens(questions: any[]) {
        dispatch(getQuestionsRequest());
    }

    return (
        <>
            <h1>Создание квестов 1</h1>
            <div >
                {quests.map((quest: quest) => (
                    <div className={'quest'} key={quest.id}>
                        <span className={'name'}>{quest.name} </span>
                        <Button variant="text" onClick={getQuestens(quest.questions)}>Открыть вопросы({quest.questions.length})</Button>
                        <div className={'questions-list'}>
                            {questions.map((questions: any) => (
                                    <div className={'questions'} key={quest.id}>
                                        <span className={'name'}>questions.name</span>
                                    </div>
                             ))}
                        </div>
                    </div>
                ))}
            </div>


        </>
    );
    {/*<Button variant="text" onClick={() => console.log('вопросы')}>Открыть вопросы</Button>*/}
    {/*<Button variant="contained" ></Button>*/}
}
