import { Routes, Route, Navigate } from "react-router-dom";

// Authentication routes
import PublicRoute from "./PublicRoute";
import Login from "../pages/login";
import SignUp from "../pages/signUp";
import ForgotPassword from "../pages/forgotPassword";
import ResetPassword from "../pages/resetPassword";

// app routes
import PrivateRoute from "./PrivateRoute";
import AppRoutes from "./AppRoutes";

import { useAuth } from "../context/AuthContext";

const MRoutes = () => {
    const { token, user } = useAuth();

    return (
        <Routes>
            <Route
                path="/"
                element={
                    token && user?._id ? (
                        <Navigate to="/app" replace />
                    ) : (
                        <Navigate to="/login" replace />
                    )
                }
            />

            {/* Public login route: Accessible by everyone */}
            <Route path="/login" element={<PublicRoute component={Login} />} />

            {/* Public register route: Accessible by everyone */}
            <Route
                path="/register"
                element={<PublicRoute component={SignUp} />}
            />

            {/* Public forgot password route: Accessible by everyone */}
            <Route
                path="/forgot-password"
                element={<PublicRoute component={ForgotPassword} />}
            />

            {/* Public reset password route: Accessible by everyone */}
            <Route
                path="/reset-password/:resetToken"
                element={<PublicRoute component={ResetPassword} />}
            />

            <Route
                path="/app/*"
                element={<PrivateRoute component={AppRoutes} />}
            />

            {/* Wildcard route for undefined paths. Shows a 404 error */}
            <Route
                path="*"
                element={
                    <div className="flex justify-center align-middle w-screen">
                        <p>404 Not found</p>
                    </div>
                }
            />
        </Routes>
    );
};

export default MRoutes;
