import { useForm, useFieldArray } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import {deleteQuestionRequest, putQuestionsRequest} from "@src/quests/slices/quests.slice.ts";
import {useDispatch} from "react-redux";
import {question} from "@src/quests/models/quests.ts";
import { useEffect } from "react";

type QuestionsFormData = {
    questions: question[];
  };

export default function QuestionsForm({ questions, quest_id }: {questions: question[], quest_id: number}) {
    const dispatch = useDispatch();
    const { control, register, handleSubmit, formState: { errors }, reset } = useForm<QuestionsFormData>({
        defaultValues: {
            questions: []
        }
    });

    const { fields, append, remove  } = useFieldArray({ control, name: "questions", keyName: "formId" });

    useEffect(() => {
        if (questions && questions.length > 0) {
            reset({
              questions: questions.map(q => ({
                id: q.id,
                name: q.name || '',
                description: q.description || '',
                image: q.image || '',
                question: q.question || '',
                buttons: q.buttons || '',
                answer: q.answer || '',
                text_after_answer: q.text_after_answer || '',
                sort_number: q.sort_number || null,
                quest_id: q.quest_id,   
              }))
            });
          }
    }, [questions, reset]);

    function removeQuestion(id_question: number, index: number) {
        dispatch(deleteQuestionRequest(id_question));
        remove(index);
    }

    const onSubmit = (data: any) => {
        
       
        dispatch(putQuestionsRequest(data));
        // const file = data.image[0];
        // const formData = new FormData();
        // data.image = formData.append("image", file);
        console.log("Сохранённые данные:", data);
       
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="questions-form">
            <Button
                variant="outlined"
                onClick={() =>
                    append({
                        id: NaN,
                        name: '',
                        description: '',
                        image: '',
                        question: '',
                        buttons: '',
                        answer: '',
                        text_after_answer: '',
                        sort_number: null,
                        quest_id: quest_id,
                    })
                }
            >
                + Добавить вопрос
            </Button>  <Button type="submit" variant="contained">Сохранить</Button>
            {questions && fields.map((field, index) => (
                <div key={field.id} className="question">
                    <div className="question-id"><span>{index + 1}.</span> <Button color="error" onClick={() => removeQuestion(field.id, index)}>
                            Удалить
                        </Button>
                        <br/>
                       
                        
                    </div>
                    <TextField
                        label="Номер вопроса"
                        fullWidth
                        {...register(`questions.${index}.sort_number`, {
                            required: "Введите номер вопроса"
                        })}
                        error={!!errors?.questions?.[index]?.sort_number}
                        helperText={errors?.questions?.[index]?.sort_number?.message}
                    />
                    <TextField
                        label="Название вопроса(заголовок вопроса)"
                        fullWidth
                        {...register(`questions.${index}.name`, {
                            required: "Введите название вопроса"
                        })}
                        error={!!errors?.questions?.[index]?.name}
                        helperText={errors?.questions?.[index]?.name?.message}
                    />
                    <TextField
                        label="Описание"
                        multiline
                        rows={8}
                        fullWidth
                        {...register(`questions.${index}.description`)}
                        margin="normal"
                    />
                    <TextField
                        label="Вопрос"
                        multiline
                        rows={4}
                        fullWidth
                        {...register(`questions.${index}.question`, { required: "Вопрос обязательно" })}
                        error={!!errors?.questions?.[index]?.question}
                        helperText={!!errors?.questions?.[index]?.question?.message}
                        margin="normal"
                    />
                    <TextField
                        label="Кнопки (например: первый,второй,третий)"
                        fullWidth
                        {...register(`questions.${index}.buttons`)}
                    />
                    <TextField
                        label="Ответ"
                        fullWidth
                        {...register(`questions.${index}.answer`, {
                            required: "Введите Ответ"
                        })}
                        error={!!errors?.questions?.[index]?.answer}
                        helperText={!!errors?.questions?.[index]?.answer?.message}
                    />
                    <TextField
                        label="Текст после ответа"
                        multiline
                        fullWidth
                        rows={8}
                        {...register(`questions.${index}.text_after_answer`)}
                    />
                </div>
            ))}

        </form>
    );
}
