import React, { useEffect, useRef, useState } from "react";
import { Button, Modal } from "antd";

import TextInput from "../../../components/TextInput";
import { showNotification } from "../../../utils";

import { useAuth } from "../../../context/AuthContext";

const ChangePasswordModal = ({ isOpen, handleClose = () => {} }) => {
    const prevProps = useRef();

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const { changePassword } = useAuth();

    useEffect(() => {
        if (!isLoading && prevProps.current?.isLoading) {
            handleClose();
        }

        return () => {
            prevProps.current = {
                isLoading,
            };
        };
    }, [isLoading]);

    const handleChange = (name) => (e) => {
        setData({
            ...data,
            [name]: e.target.value,
        });
    };

    const onSave = async () => {
        if (isLoading) return;

        if (Object.values(data).some((val) => !val)) {
            showNotification("error", "All fields are required");
            return;
        }

        if (data.newPassword !== data.confirmPassword) {
            showNotification(
                "error",
                "New password and confirm password is not same"
            );
            return;
        }

        await changePassword(data, setIsLoading);
    };

    return (
        <Modal
            title="Change Password"
            open={isOpen}
            onCancel={handleClose}
            footer={
                <>
                    <Button onClick={handleClose}>Close</Button>

                    <Button type="primary" onClick={onSave} loading={isLoading}>
                        Save
                    </Button>
                </>
            }
        >
            {/* Input for entering the old password */}
            <TextInput
                name="password"
                labelClassName="dark:text-gray-900"
                label="Old Password"
                placeholder="Old Password"
                type="password"
                value={data.oldPassword}
                onChange={handleChange("oldPassword")}
            />

            {/* Input for entering the password */}
            <TextInput
                name="password"
                labelClassName="dark:text-gray-900"
                label="New Password"
                placeholder="New Password"
                type="password"
                value={data.newPassword}
                onChange={handleChange("newPassword")}
            />

            {/* Input for entering the confirm password */}
            <TextInput
                name="confirmPassword"
                labelClassName="dark:text-gray-900"
                label="Confirm Password"
                placeholder="Confirm Password"
                type="password"
                value={data.confirmPassword}
                onChange={handleChange("confirmPassword")}
            />
        </Modal>
    );
};

export default ChangePasswordModal;
