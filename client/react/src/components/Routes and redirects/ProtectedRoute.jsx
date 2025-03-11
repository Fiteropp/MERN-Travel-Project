import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

const ProtectedRoute = ({allowedRoles}) => {
    const { user } = useUser();

    if (!user) {
        return <Navigate to="/login" />
    }

    const hasPermission = user.roles?.some(role => allowedRoles.includes(role.name));

    if (!hasPermission) {
        return <Navigate to="/" />
    }

    return <Outlet/>
}

export default ProtectedRoute;