import { useForm, useFieldArray } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import {putQuestionsRequest} from "@src/quests/slices/quests.slice.ts";
import {useDispatch} from "react-redux";
import {question} from "@src/quests/models/quests.ts";

export default function QuestionsForm({ questions }: {questions: question[]}) {
    console.log('questions',questions);
    const dispatch = useDispatch();
    const { control, register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            questions: questions.map(q => ({
                id: q.id,
                name: q.name || '',
                description: q.description || '',
                image: q.image || '',
                question: q.question || '',
                buttons: q.buttons || '',
                answer: q.answer || '',
            }))
        }
    });

    const { fields, append, remove  } = useFieldArray({ control, name: "questions" });

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
                    })
                }
            >
                + Добавить вопрос
            </Button>  <Button type="submit" variant="contained">Сохранить</Button>
            {fields.map((field, index) => (
                <div key={field.id} className="question">
                    <div className="question-id"><span>{index + 1}.</span>
                        <br/>
                        ID (номер вопроса в базе): {questions?.[index]?.id}
                        <Button color="error" onClick={() => remove(index)}>
                            Удалить
                        </Button>
                    </div>
                    <TextField
                        label="Имя"
                        fullWidth
                        {...register(`questions.${index}.name`, {
                            required: "Введите имя"
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

                </div>
            ))}

        </form>
    );
}
