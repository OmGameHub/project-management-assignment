import React, { useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { classNames } from "../utils";
import { Avatar, Dropdown, Space } from "antd";
import { useAuth } from "../context/AuthContext";

const routes = [
    { path: "/app/dashboard", name: "Dashboard" },
    { path: "/app/projects", name: "Projects" },
];

const AppNavBar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { logout } = useAuth();

    const items = useMemo(
        () => [
            {
                key: "profile",
                label: "Profile",
                onClick: () => {
                    navigate("/app/profile");
                },
            },
            {
                key: "signOut",
                label: "Sign Out",
                onClick: () => {
                    logout();
                },
            },
        ],
        []
    );

    return (
        <nav className="bg-gray-800">
            <div className="mx-auto px-2 sm:px-4 lg:px-8">
                <div className="relative flex h-12 items-center justify-between">
                    <div className="flex items-center px-2 lg:px-0">
                        <a href="/quick-test">
                            <div className="flex-shrink-0 flex items-center">
                                <span className="text-white font-medium text-base px-3 hidden lg:block tracking-wider">
                                    Project Manage
                                </span>
                                <span className="text-white font-medium px-3 block lg:hidden"></span>
                            </div>
                        </a>

                        {/* nav routes */}
                        <div className="lg:ml-6 lg:block">
                            <div className="flex space-x-4">
                                {routes.map((route) => (
                                    <Link
                                        key={route.name}
                                        to={route.path}
                                        className={classNames(
                                            "rounded-md  px-3 py-2 text-sm font-medium text-white",
                                            location.pathname === route.path
                                                ? "bg-gray-900"
                                                : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                        )}
                                    >
                                        {route.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <Dropdown menu={{ items }}>
                            <Space>
                                <Avatar className="">Om</Avatar>
                            </Space>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default AppNavBar;
