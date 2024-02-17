import React, { useState } from "react";
import { Button } from "antd";

import TextInput from "../../components/TextInput";
import ChangePasswordModal from "./components/ChangePasswordModal";

import { useAuth } from "../../context/AuthContext";

const Profile = () => {
    const { user, updateUserDetails } = useAuth();

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(user);

    const [showChangePasswordModal, setShowChangePasswordModal] =
        useState(false);

    const handleChange = (name) => (e) => {
        setData({
            ...data,
            [name]: e.target.value,
        });
    };

    const handleSaveUser = async () => {
        if (isLoading) return;
        await updateUserDetails(data, setIsLoading);
    };

    return (
        <div className="bg-white w-screen">
            <div className="p-4 flex justify-end mb-8">
                <Button
                    type="primary"
                    onClick={() => setShowChangePasswordModal(true)}
                >
                    Change Password
                </Button>
            </div>

            <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen ">
                <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-4">
                        Profile Information
                    </h1>

                    {/* Input for enter the first name */}
                    <TextInput
                        label="First Name"
                        name="firstName"
                        placeholder="First Name"
                        value={data.firstName}
                        onChange={handleChange("firstName")}
                    />

                    {/* Input for enter the last name */}
                    <TextInput
                        label="Last Name"
                        name="lastName"
                        placeholder="Last Name"
                        value={data.lastName}
                        onChange={handleChange("lastName")}
                    />

                    {/* Input for enter the email */}
                    <TextInput
                        label="Email"
                        name="email"
                        value={data.email}
                        disabled
                    />

                    {/* Button to initiate the login process */}
                    <Button
                        type="primary"
                        block
                        size="large"
                        onClick={handleSaveUser}
                        loading={isLoading}
                        className="mt-8"
                    >
                        Save
                    </Button>
                </div>
            </div>

            <ChangePasswordModal
                isOpen={showChangePasswordModal}
                handleClose={() => setShowChangePasswordModal(false)}
            />
        </div>
    );
};

export default Profile;
