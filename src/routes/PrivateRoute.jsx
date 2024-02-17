import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ component: Component }) => {
    const { token, user } = useAuth();

    if (!token || !user?._id) return <Navigate to="/login" replace />;

    return <Component />;
};

export default PrivateRoute;
