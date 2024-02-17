import { useState } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

import AuthFormContainer from "../components/AuthFormContainer";
import TextInput from "../components/TextInput";
import { useAuth } from "../context/AuthContext";
import { showNotification } from "../utils";

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);

    // State to manage input data
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    // Accessing the login function from the AuthContext
    const { register } = useAuth();

    // Function to update state when input data changes
    const handleChange = (name) => (e) => {
        setData({
            ...data,
            [name]: e.target.value,
        });
    };

    // Function to handle the login process
    const handleSignUp = async () => {
        if (Object.values(data).some((val) => !val)) {
            showNotification("error", "All fields are required");
            return;
        }

        if (isLoading) return;
        await register(data, setIsLoading);
    };

    return (
        <AuthFormContainer formTitle="Sign Up">
            <div className="grid grid-cols-2 gap-4">
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
            </div>

            {/* Input for entering the email */}
            <TextInput
                label="Email"
                name="email"
                placeholder="Email"
                value={data.email}
                onChange={handleChange("email")}
            />

            {/* Input for entering the password */}
            <TextInput
                label="Password"
                name="password"
                placeholder="Password"
                type="password"
                value={data.password}
                onChange={handleChange("password")}
            />

            {/* Input for entering the confirm password */}
            <TextInput
                label="Confirm Password"
                name="confirmPassword"
                placeholder="Confirm password"
                type="password"
                value={data.confirmPassword}
                onChange={handleChange("confirmPassword")}
            />

            {/* Button to initiate the login process */}
            <Button
                type="primary"
                block
                size="large"
                onClick={handleSignUp}
                loading={isLoading}
            >
                Sign Up
            </Button>

            <div className="mt-4">
                <small className="text-zinc-300">
                    Already have an account?{" "}
                    <Link className="text-primary hover:underline" to="/login">
                        Sign In
                    </Link>
                </small>
            </div>
        </AuthFormContainer>
    );
};

export default Login;
