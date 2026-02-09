import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@src/_redux/store.ts";
import { clear, getQuestionsRequest, getQuestsRequest } from "@src/quests/slices/quests.slice.ts";
import { quest, question } from "@src/quests/models/quests.ts";
import './build-quests.scss';
import { Button } from "@mui/material";
import QuestionsForm from "@src/quests/components/questionsForm.tsx";
import QuestForm from "@src/quests/components/questForm.tsx";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function BuildQuests() {
    const { quests, questions, success } = useSelector((state: RootState) => state.quests);
    const [openQuest, setOpenQuest] = useState<number | null>(null);
    const [openQuestons, setOpenQuestons] = useState('');
    const [newQuest, setNewQuest] = useState<quest | undefined>(undefined);
    const dispatch = useDispatch();
    const location = useLocation();
    const isChildRoute = location.pathname !== '/build-quests';

    useEffect(() => {
        dispatch(getQuestsRequest());

    }, [dispatch]);


    useEffect(() => {
        setNewQuest(undefined);
        setOpenQuest(null);
        setOpenQuestons('')
        dispatch(clear());
    }, [success]);


    function openQuestForm(id: number) {
        if (openQuest === id) {
            setOpenQuest(null)
        } else {
            setOpenQuest(id)
            dispatch(clear());
            setOpenQuestons('')
        }

        // setQuestions(questions);
    }

    function buildNewQuest() {
        const data: quest = {
            id: NaN,
            name: '',
            description: '',
            image: '',
            start: '',
            price: NaN,
            duration: NaN,
            questions: '',
            public: false
        }
        setNewQuest(data)
    }

    return (
        <>
            <Outlet />
            {!isChildRoute && (
                <>
                    <h1>Создание квестов</h1>
                    <div className={'build-quest'}>
                        <Button
                            variant="outlined"
                            onClick={() => buildNewQuest()}
                        >
                            + Добавить квест
                        </Button>
                        {newQuest && <div className={'questions-list'}>
                            <QuestForm quest={newQuest} />
                        </div>}
                        {quests.map((quest: quest) => (
                            <div className={'quest'} key={quest.id}>
                                <span className={'name'}>{quest.name} </span>
                                <Button variant="text" onClick={() => openQuestForm(quest.id)}>
                                    Редактировать квест</Button>
                                <Link to={`/build-quests/${quest.id}?name=${encodeURIComponent(quest.name)}&questions=${encodeURIComponent(quest.questions)}`}>
                                    <Button variant="text"> Открыть вопросы</Button>
                                </Link>

                                {openQuest === quest.id && <div className={'questions-list'}>
                                    <QuestForm quest={quest} />
                                </div>}

                                
                            </div>
                        ))}
                        
                    </div>
                </>
            )}
        </>
    );

}

{/*<Box*/ }
{/*    component="form"*/ }
{/*    noValidate*/ }
{/*    onSubmit={handleSubmit(onSubmit)}*/ }
{/*>*/ }
{/*    <TextField*/ }
{/*        label="Имя"*/ }
{/*        {...register("name", {required: "Введите Имя"})}*/ }
{/*        error={!!errors.name}*/ }
{/*        helperText={errors.name?.message}*/ }
{/*    />*/ }
{/*    <TextField*/ }
{/*        label="Описание"*/ }
{/*        {...register("description", {required: "Введите Описание"})}*/ }
{/*        error={!!errors.description}*/ }
{/*        helperText={errors.description?.message}*/ }
{/*    />*/ }
{/*    <Button variant="contained" type="submit">Войти</Button>*/ }
{/*</Box>*/ }

{/*<Button variant="text" onClick={() => console.log('вопросы')}>Открыть вопросы</Button>*/ }
{/*<Button variant="contained" ></Button>*/ }
