import { Navigate } from "react-router";
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "@src/_redux/store.ts";

interface Props {
    children: React.ReactNode;
}

export default function PrivateRoute({ children }: Props) {

    const { username, token , isLoading} = useSelector((state: RootState) => state.auth);

    if (isLoading) {
        return <div>Загрузка...</div>;
    }
    const isAuthenticated = !!username && !!token;
    return isAuthenticated ? children : <Navigate to="/auth" />;
}
