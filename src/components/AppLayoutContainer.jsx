import React from "react";
import AppNavBar from "./AppNavBar";
import { Layout } from "antd";

const AppLayoutContainer = ({ children }) => {
    return (
        <Layout.Content className="h-screen w-screen overflow-hidden">
            <AppNavBar />

            {children}
        </Layout.Content>
    );
};

export default AppLayoutContainer;
