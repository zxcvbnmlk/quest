import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@src/_redux/store.ts";
import {clear, getQuestionsRequest, getQuestsRequest} from "@src/quests/slices/quests.slice.ts";
import {quest} from "@src/quests/models/quests.ts";
import './build-quests.scss';
import {Button} from "@mui/material";
import QuestionsForm from "@src/quests/components/questionsForm.tsx";
import QuestForm from "@src/quests/components/questForm.tsx";

export default function BuildQuests() {
    const { quests, loading, error, questions, success} = useSelector((state: RootState) => state.quests);
    const [openQuest, setOpenQuest] = useState('');
    const [openQuestons, setOpenQuestons] = useState('');
    const [newQuest, setNewQuest] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getQuestsRequest());

    }, [dispatch]);


    useEffect(() => {
        setNewQuest(undefined);
        setOpenQuest('');
        setOpenQuestons('')
        dispatch(clear());
    }, [success]);

    // if (loading) return <p>Загрузка...</p>;
    // if (error) return <p>Ошибка: {error}</p>;

    function openQuestions(id: string, questionsList: any) {
        if(openQuestons === id){
            dispatch(clear());
            setOpenQuestons('')
        } else {
            dispatch(getQuestionsRequest(questionsList));
            //toDo сначало getQuestionsRequest затем всё остальное: setOpenQuestons(id)
            setOpenQuestons(id)
            setOpenQuest('')

        }

        // setQuestions(questions);
    }
    function openQuestForm(id: string) {
        if(openQuest === id){
            setOpenQuest('')
        } else {
            setOpenQuest(id)
            dispatch(clear());
            setOpenQuestons('')
        }

        // setQuestions(questions);
    }

    function buildNewQuest() {
        const data: quest = {
                id: '',
                name: '',
                description : '',
                image : '',
                start : '',
                price : NaN,
                duration : NaN,
                questions : [],
                public: false
        }
        setNewQuest(data)
    }

    return (
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
                        <Button variant="text" onClick={() =>openQuestForm(quest.id)}>Редактировать квест</Button> <Button variant="text" onClick={() =>openQuestions(quest.id, quest.questions)}>Открыть вопросы({quest.questions.length})</Button>

                        {openQuest ===  quest.id && <div className={'questions-list'}>
                            <QuestForm quest={quest} />
                        </div>}

                        {openQuestons ===  quest.id && <div className={'questions-list'}>
                            <QuestionsForm questions={questions} />
                        </div>}
                    </div>
                ))}
            </div>


        </>
    );

}

{/*<Box*/}
{/*    component="form"*/}
{/*    noValidate*/}
{/*    onSubmit={handleSubmit(onSubmit)}*/}
{/*>*/}
{/*    <TextField*/}
{/*        label="Имя"*/}
{/*        {...register("name", {required: "Введите Имя"})}*/}
{/*        error={!!errors.name}*/}
{/*        helperText={errors.name?.message}*/}
{/*    />*/}
{/*    <TextField*/}
{/*        label="Описание"*/}
{/*        {...register("description", {required: "Введите Описание"})}*/}
{/*        error={!!errors.description}*/}
{/*        helperText={errors.description?.message}*/}
{/*    />*/}
{/*    <Button variant="contained" type="submit">Войти</Button>*/}
{/*</Box>*/}

{/*<Button variant="text" onClick={() => console.log('вопросы')}>Открыть вопросы</Button>*/}
{/*<Button variant="contained" ></Button>*/}
