import { useForm } from "react-hook-form";
import { TextField, Button, Checkbox, FormControlLabel, Box } from "@mui/material";
import { getQuestsRequest, putQuestRequest } from "@src/quests/slices/quests.slice.ts";
import { useDispatch } from "react-redux";
import { quest } from "@src/quests/models/quests.ts";
import { useEffect, useState } from "react";
import { IMG_DIR } from "@src/_env/env";


interface QuestForm {
    quest: quest;
}

export default function QuestForm({ quest }: { quest: quest }) {
    console.log('questions', quest);
    const [isPublic, setIsPublic] = useState(quest.public);
    const [image, setImage] = useState<File | null>(null);
    const dispatch = useDispatch();
    const [imagePreview, setImagePreview] = useState(quest.image_url || "");
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<QuestForm>({
        defaultValues: {
            quest: {
                id: quest.id,
                name: quest.name,
                description: quest.description,
                image: quest.image,
                start: quest.start,
                price: quest.price,
                duration: quest.duration,
                questions: quest.questions,
                public: quest.public,
                image_url: quest.image_url,
            }
        }
    });

    useEffect(() => {
        setImagePreview(IMG_DIR + quest.image_url);
    }, [quest.image_url]);

    const onImageChange = (e: any) => {
        const file = e.target.files?.[0];
        if (file) {
            //   setValue("quest.image_url", file); // store the file in the form
            // const file = data.image[0];
            // const formData = new FormData();
            // data.image = formData.append("image", file);
            // const formData = new FormData();
            // formData.append("image", file);
            console.log('file', file);
            file.fileName =  'quest_' + quest.id + '_' + file.name;
            setValue("quest.image", file);
            setImage(file);
            console.log('quest', quest.image);
            setImagePreview(URL.createObjectURL(file)); // show preview
        }
    };


    const onSubmit = (data: any) => {
        console.log('image', image);
        const formData = new FormData();
        if (image) {
            formData.append("image", image);
        }
        Object.entries(data.quest).forEach(([key, value]) => {
            if (key !== "image") formData.append(key, value as any);
        });

        dispatch(putQuestRequest(formData));
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
                {/* <FileField
                        label="Изображение"
                        fullWidth
                        {...register(`quest.image_url`, {
                            required: "Выберите изображение"
                        })}
                    /> */}
                <div>
                    <Button variant="contained" component="label">
                        Загрузить изображение
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            {...register("quest.image")}
                            onChange={onImageChange}
                        />
                    </Button>
                    <br />
                    <br />
                    <Box
                        component="img"
                        sx={{
                            height: 233,

                            maxHeight: { xs: 233, md: 167 },
                            maxWidth: { xs: 350, md: 250 },
                        }}
                        alt="Изображение"
                        src={imagePreview}

                    />


                </div>
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
