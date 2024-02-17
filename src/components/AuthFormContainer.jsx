import { Col, Row } from "antd";
import React from "react";

const AuthFormContainer = ({ children, formTitle }) => {
    return (
        <div className="bg-gray-50 dark:bg-gray-900 w-screen">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a
                    className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                    href="#"
                >
                    Project Management
                </a>

                <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-4">
                        {formTitle}
                    </h1>

                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthFormContainer;
