import Home from "@src/home/home";
import Search from "@src/search/search";
import Chat from "@src/chat/chat";
import {Route, Routes } from "react-router";
import Auth from "@src/auth/auth.tsx";
import PrivateRoute from "@src/_routes/PrivateRoute.tsx";




export default function AppRouter() {
    return (
        <Routes>

            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
            <Route path="/search" element={<PrivateRoute><Search /></PrivateRoute>} />
        </Routes>

    );
}
