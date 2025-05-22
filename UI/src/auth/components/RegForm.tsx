import {useNavigate} from "react-router-dom";
import {Box, Button, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {regRequest, toggleReg} from "@src/auth/slices/authSlice.ts";
import {useForm} from "react-hook-form";
import {regFormValues} from "@src/auth/models/auth.ts";
import {RootState} from "@src/_redux/store.ts";
import {useEffect} from "react";
import {isValidEmail} from "@src/_common/format/email.ts";



export default function RegForm() {
    const dispatch = useDispatch();
    const { username, token} = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm<regFormValues>();

    const onSubmit = (data: regFormValues) => {
        dispatch(regRequest(data));
        dispatch(toggleReg())
    };

    const password = watch("password");


    useEffect(() => {
        if (!!username && !!token ) {
            navigate("/");
        }
    },[username,token])


        return (
            <>
                <h1>Регистрация</h1>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <TextField
                        label="E-mail"
                        {...register("login", {required: "Введите E-mail",
                            validate: (value) =>
                                isValidEmail(value) || "E-mail не корректен"})}
                        error={!!errors.login}
                        helperText={errors.login?.message}
                    />
                    <TextField
                        label="ФИО"
                        {...register("username", {required: "Введите ФИО"})}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                    />
                    <TextField
                        label="Пароль"
                        type="password"
                        {...register("password", {required: "Введите пароль"
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <TextField
                        label="Пароль"
                        type="password"
                        {...register("confirmPassword", {required: "Повторите пароль",
                            validate: (value) =>
                                value === password || "Пароли не совпадают",})}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                    />
                    <Button variant="contained" type="submit">Отправить</Button>
                </Box>

            </>
        )

}
