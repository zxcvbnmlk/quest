import { Navigate } from "react-router";
import React, {} from "react";

interface Props {
    children: React.ReactNode;
}

export default function PrivateRoute({ children }: Props) {
    const credentials = JSON.parse(localStorage.getItem("credentials") || "{}");
    const isAuthenticated = !!credentials.username && !!credentials.token;
    return isAuthenticated ? children : <Navigate to="/auth" />;
}
