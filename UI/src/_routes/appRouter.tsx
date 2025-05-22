import Home from "@src/home/home";
import {Route, Routes } from "react-router";
import Auth from "@src/auth/auth.tsx";
import PrivateRoute from "@src/_routes/PrivateRoute.tsx";
import Users from "@src/users/users.tsx";




export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
        </Routes>

    );
}
