import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

import AuthFormContainer from "../components/AuthFormContainer";
import TextInput from "../components/TextInput";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    // State to manage input data (email and password)
    const [data, setData] = useState({
        email: "",
    });

    const { forgotPassword } = useAuth();

    // Function to update state when input data changes
    const handleChange = (name) => (e) => {
        setData({
            ...data,
            [name]: e.target.value,
        });
    };

    // Function to handle request for password reset
    const handleRequestPasswordReset = async () => {
        if (isLoading) return;
        await forgotPassword(data, setIsLoading);
    };

    return (
        <AuthFormContainer formTitle="Forgot your password?">
            {/* Input for entering the email */}
            <TextInput
                name="email"
                label="Email"
                placeholder="Email"
                value={data.email}
                onChange={handleChange("email")}
            />

            {/* Button to initiate the login process */}
            <Button
                type="primary"
                block
                size="large"
                onClick={handleRequestPasswordReset}
                loading={isLoading}
            >
                Request Password Reset
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
