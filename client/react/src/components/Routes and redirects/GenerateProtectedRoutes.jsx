import React from "react";
import { Route } from "react-router-dom";

import ModDash from "./../../pages/ModDash.jsx";
import UserDash from "./../../pages/UserDash.jsx";
import AdminDash from "./../../pages/AdminDash.jsx";
import ProtectedRoute from "./ProtectedRoute";

const RoleBasedRoutes = [
    { path: "/userprofile", element: <UserDash />, roles: ["user"] },
    { path: "/moderator", element: <ModDash />, roles: ["moderator", "admin"] },
    { path: "/admindash", element: <AdminDash />, roles: ["admin"] }
]

export const generateProtectedRoutes = () => {
    return RoleBasedRoutes.map(({ path, element, roles }) => (
        <Route key={path} element={<ProtectedRoute allowedRoles={roles} />}>
            <Route path={path} element={element} />
        </Route>

    )
    )
}