import { BrowserRouter as Router } from "react-router";
import AppRouter from "./_routes/appRouter";
import Header from "./_components/header/header.tsx";
import './App.scss'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@src/_redux/store.ts";
import {useEffect} from "react";
import {authSuccess} from "@src/auth/slices/authSlice.ts";


export default function App() {
    const dispatch = useDispatch();
    const {username, token} = useSelector((state: RootState) => state.auth);
    useEffect(() => {
        const credentials = JSON.parse(localStorage.getItem("credentials") || "{}");

        if (credentials.username && credentials.token) {
            dispatch(authSuccess(credentials));
        }
    }, [dispatch]);

    const isAuthenticated = username && token;
    return (
        <Router>
            {isAuthenticated && <Header />}
            <div className="content">
                <AppRouter />
            </div>
        </Router>
    );
}

