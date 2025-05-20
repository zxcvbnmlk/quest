import {useNavigate} from "react-router-dom";
import {Box, Button, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {authRequest} from "@src/auth/slices/authSlice.ts";
import {useForm} from "react-hook-form";
import {authFormValues} from "@src/auth/models/auth.ts";
import {RootState} from "@src/_redux/store.ts";
import {useEffect} from "react";



export default function AuthForm() {
    const dispatch = useDispatch();
    const { username, token,isLoading } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<authFormValues>();

    const onSubmit = (data: authFormValues) => {
        dispatch(authRequest(data));
    };

    useEffect(() => {
        if (!!username && !!token ) {
            navigate("/");
        }
    },[username,token])


    if (isLoading) {
        return (
            <>
                <h1>Авторизация</h1>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <TextField
                        label="Логин"
                        {...register("username", {required: "Введите логин"})}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                    />
                    <TextField
                        label="Пароль"
                        type="password"
                        {...register("password", {required: "Введите пароль"})}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <Button variant="contained" type="submit">Войти</Button>
                </Box>

            </>
        )
    }

}
