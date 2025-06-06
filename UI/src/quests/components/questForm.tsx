import { useForm } from "react-hook-form";
import {TextField, Button, Checkbox, FormControlLabel} from "@mui/material";
import {getQuestsRequest, putQuestRequest} from "@src/quests/slices/quests.slice.ts";
import {useDispatch} from "react-redux";
import {quest} from "@src/quests/models/quests.ts";
import {useState} from "react";


interface QuestForm {
    quest: quest;
}

export default function QuestForm({ quest}: { quest: quest }) {
    console.log('questions',quest);
    const [isPublic, setIsPublic] = useState(quest.public);
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm<QuestForm>({
        defaultValues: {
            quest: {
                id: quest.id,
                name: quest.name,
                description : quest.description,
                image : quest.image,
                start : quest.start,
                price : quest.price,
                duration : quest.duration,
                questions : quest.questions,
                public: quest.public
            }
        }
    });


    const onSubmit = (data: any) => {
        data.quest.questions = Array.isArray(data.quest.questions) ? data.quest.questions : data.quest.questions?.split(',');
        dispatch(putQuestRequest(data.quest));
        dispatch(getQuestsRequest());
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="quest-form">
            <Button type="submit" variant="contained">Сохранить</Button>

                <div key={quest.id} className="quest">
                    <TextField
                        label="Имя"
                        fullWidth
                        {...register(`quest.name`, {
                            required: "Введите имя"
                        })}
                        error={!!errors?.quest?.name}
                        helperText={errors?.quest?.name?.message}
                    />
                    <TextField
                        label="Описание"
                        multiline
                        rows={8}
                        fullWidth
                        {...register(`quest.description`, {
                            required: "Введите Описание"
                        })}
                        margin="normal"
                        error={!!errors?.quest?.description}
                        helperText={errors?.quest?.description?.message}
                    />
                    <TextField
                        label="Начало маршрута"
                        fullWidth
                        {...register(`quest.start`, {
                            required: "Введите Начало маршрута"
                        })}
                        error={!!errors?.quest?.start}
                        helperText={errors?.quest?.start?.message}
                    />
                    <TextField
                        label="Стоимость"
                        fullWidth
                        type={"number"}
                        {...register(`quest.price`, {
                            required: "Введите Стоимость"
                        })}
                        error={!!errors?.quest?.price}
                        helperText={errors?.quest?.price?.message}
                    />
                    <TextField
                        label="Время прохождения (минуты)"
                        type={"number"}
                        fullWidth
                        {...register(`quest.duration`)}
                    />
                    <TextField
                        label="Вопросы"
                        fullWidth
                        {...register(`quest.questions`)}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} name="public" />
                        }
                        label="Опубликовано"
                    />
                </div>


        </form>
    );
}


// const { fields, append, remove  } = useFieldArray({ control, name: "questions" });
// dispatch(putQuestionsRequest(data));
// const file = data.image[0];
// const formData = new FormData();
// data.image = formData.append("image", file);
