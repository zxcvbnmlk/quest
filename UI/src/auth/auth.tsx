import AuthForm from "./components/AuthForm.tsx";
import {Button} from "@mui/material";

import RegForm from "@src/auth/components/RegForm.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@src/_redux/store.ts";
import {toggleReg} from "@src/auth/slices/authSlice.ts";
import {Link} from "react-router-dom";

export default function Auth() {
    const dispatch = useDispatch();
    let {reg,error, success} = useSelector((state: RootState) => state.auth);

        return (
            <div className={'auth'}>
                <Link to="/">
                    <Button>Назад</Button>
                </Link>
                {!reg && <AuthForm/>}
                {!reg && <Button variant="text" onClick={() => dispatch(toggleReg())}>Регистрация</Button>}

                {reg && <RegForm/>}
                {reg && <Button variant="text" onClick={() => dispatch(toggleReg())}>Вход</Button>}

                {error && <div>{error.toString()}</div>}
                {success && <div>{success.message}</div>}
            </div>
        )

}
