import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import AppLayoutContainer from "../components/AppLayoutContainer";

import Dashboard from "../pages/app/dashboard";

import { ProjectProvider } from "../context/ProjectContext";
import Profile from "../pages/app/profile";

const AppRoutes = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (pathname === "/app") {
            navigate("/app/dashboard", { replace: true });
        }
    }, [pathname]);

    return (
        <ProjectProvider>
            <AppLayoutContainer>
                <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="profile" element={<Profile />} />

                    <Route
                        path="*"
                        element={
                            <div className="flex items-center justify-center align-middle h-screen w-screen">
                                <p>404 Not found</p>
                            </div>
                        }
                    />
                </Routes>
            </AppLayoutContainer>
        </ProjectProvider>
    );
};

export default AppRoutes;
