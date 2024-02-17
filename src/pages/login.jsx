import { useState } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

import AuthFormContainer from "../components/AuthFormContainer";
import TextInput from "../components/TextInput";

import { useAuth } from "../context/AuthContext";
import { showNotification } from "../utils";

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    // state to manage input data email and password
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const { login } = useAuth();

    // Function to update state when input data changes
    const handleChange = (name) => (e) => {
        setData({
            ...data,
            [name]: e.target.value,
        });
    };

    // Function to handle the login process
    const handleLogin = async () => {
        if (isLoading) return;

        if (Object.values(data).some((val) => !val)) {
            showNotification("error", "All fields are required");
            return;
        }

        await login(data, setIsLoading);
    };

    return (
        <AuthFormContainer formTitle="Sign In">
            {/* Input for entering the email */}
            <TextInput
                name="email"
                label="Email"
                placeholder="Email"
                value={data.email}
                onChange={handleChange("email")}
            />

            {/* Input for entering the password */}
            <TextInput
                name="password"
                label="Password"
                placeholder="Password"
                type="password"
                value={data.password}
                onChange={handleChange("password")}
            />

            <div className="flex justify-end mt-5">
                <small className="text-zinc-300">
                    <Link
                        className="text-primary hover:underline"
                        to="/forgot-password"
                    >
                        Forgot Password?
                    </Link>
                </small>
            </div>

            {/* Button to initiate the login process */}
            <Button
                className="mt-4"
                type="primary"
                block
                size="large"
                onClick={handleLogin}
                loading={isLoading}
            >
                Sign In
            </Button>

            <div className="mt-4">
                <small className="text-zinc-300 mt-4">
                    Don&apos;t have an account?{" "}
                    <Link
                        className="text-primary hover:underline"
                        to="/register"
                    >
                        Sign up
                    </Link>
                </small>
            </div>
        </AuthFormContainer>
    );
};

export default Login;
