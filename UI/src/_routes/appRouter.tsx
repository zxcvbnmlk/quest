import Home from "@src/home/home";
import {Route, Routes} from "react-router";
import Auth from "@src/auth/auth.tsx";
import PrivateRoute from "@src/_routes/PrivateRoute.tsx";
import Users from "@src/users/users.tsx";
import BuildQuests from "@src/quests/components/build-quests.tsx";
import QuestQuestions from "@src/quests/components/quest-questions";





export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/build-quests" element={<PrivateRoute><BuildQuests /></PrivateRoute>}>
                <Route path=":id" element={<PrivateRoute><QuestQuestions /></PrivateRoute>} />
            </Route>
            <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
        </Routes>

    );
}
