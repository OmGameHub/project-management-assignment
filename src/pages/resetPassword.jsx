import { useState } from "react";
import { Button } from "antd";

import AuthFormContainer from "../components/AuthFormContainer";
import TextInput from "../components/TextInput";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    // State to manage input data (password and confirm password)
    const [data, setData] = useState({
        newPassword: "",
        confirmPassword: "",
    });

    const { resetToken } = useParams();
    const { resetPassword } = useAuth();

    // Function to update state when input data changes
    const handleChange = (name) => (e) => {
        setData({
            ...data,
            [name]: e.target.value,
        });
    };

    // Function to handle the reset password process
    const handleResetPassword = async () => {
        if (isLoading) return;
        console.log(resetToken, data);
        await resetPassword(resetToken, data, setIsLoading);
    };

    return (
        <AuthFormContainer formTitle="Set your password">
            {/* Input for entering the password */}
            <TextInput
                name="password"
                label="Password"
                placeholder="Password"
                type="password"
                value={data.newPassword}
                onChange={handleChange("newPassword")}
            />

            {/* Input for entering the password */}
            <TextInput
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm Password"
                type="password"
                value={data.confirmPassword}
                onChange={handleChange("confirmPassword")}
            />

            {/* Button to initiate the reset password process */}
            <Button
                className="mt-5"
                type="primary"
                block
                size="large"
                onClick={handleResetPassword}
                loading={isLoading}
            >
                Reset Password
            </Button>
        </AuthFormContainer>
    );
};

export default ResetPassword;
