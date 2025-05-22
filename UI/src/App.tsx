import { BrowserRouter as Router } from "react-router";
import AppRouter from "./_routes/appRouter";
import Header from "./_common/header/header.tsx";
import './App.scss'
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {authSuccess} from "@src/auth/slices/authSlice.ts";


export default function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        const credentials = JSON.parse(localStorage.getItem("credentials") || "{}");

        if (credentials.username && credentials.token) {
            dispatch(authSuccess(credentials));
        }
    }, [dispatch]);

    return (
            <Router>

                <Header/>
                <div className="content">
                    <AppRouter/>
                </div>

            </Router>
)
    ;
}

