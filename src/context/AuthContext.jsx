import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    loginUser,
    logoutUser,
    registerUser,
    updateUser,
    changeUserPassword,
    forgotPasswordRequest,
    resetUserPassword,
} from "../api";
import Loader from "../components/Loader";
import { LocalStorage, requestHandler, showNotification } from "../utils";

// Create a context to manage authentication-related data and functions
const AuthContext = createContext({
    user: null,
    token: null,
    login: async () => {},
    register: async () => {},
    updateUserDetails: async () => {},
    changePassword: async () => {},
    forgotPassword: async () => {},
    resetPassword: async () => {},
    logout: async () => {},
});

// Create a hook to access the AuthContext
const useAuth = () => useContext(AuthContext);

// Create a component that provides authentication-related data and functions
const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const navigate = useNavigate();

    // Function to handle user login
    const login = async (data, setIsLoading) => {
        await requestHandler(
            async () => await loginUser(data),
            setIsLoading,
            (res) => {
                const { data } = res;
                setUser(data.user);
                setToken(data.accessToken);
                LocalStorage.set("user", data.user);
                LocalStorage.set("token", data.accessToken);
                navigate("/app/dashboard", { replace: true });
            },
            (errorMsg) => showNotification("error", errorMsg)
        );
    };

    // Function to handle user registration
    const register = async (data, setIsLoading) => {
        await requestHandler(
            async () => await registerUser(data),
            setIsLoading,
            () => {
                showNotification(
                    "success",
                    "Account created successfully! Go ahead and login."
                );
                navigate("/login", { replace: true }); // Redirect to the login page after successful registration
            },
            (errorMsg) => showNotification("error", errorMsg)
        );
    };

    // Function to handle update user details
    const updateUserDetails = async (data, setIsLoading) => {
        await requestHandler(
            async () => await updateUser(data),
            setIsLoading,
            (res) => {
                const { data } = res;
                setUser(data);
                LocalStorage.set("user", data);

                showNotification(
                    "success",
                    "Account details update successfully!"
                );
                navigate("/app/dashboard", { replace: true }); // Redirect to the login page after successful registration
            },
            (errorMsg) => showNotification("error", errorMsg)
        );
    };

    // Function to handle update user details
    const changePassword = async (data, setIsLoading) => {
        await requestHandler(
            async () => await changeUserPassword(data),
            setIsLoading,
            () => {
                showNotification(
                    "success",
                    "Account password update successfully!"
                );
                navigate("/app/dashboard", { replace: true }); // Redirect to the login page after successful registration
            },
            (errorMsg) => showNotification("error", errorMsg)
        );
    };

    // Function to handle user reset password
    const forgotPassword = async (data, setIsLoading) => {
        await requestHandler(
            async () => await forgotPasswordRequest(data),
            setIsLoading,
            () => {
                showNotification(
                    "success",
                    "Send reset password link in your email successfully"
                );
                navigate("/login", { replace: true }); // Redirect to the login page after successful registration
            },
            (errorMsg) => showNotification("error", errorMsg)
        );
    };

    // Function to handle user reset password
    const resetPassword = async (resetToken, data, setIsLoading) => {
        await requestHandler(
            async () => await resetUserPassword(resetToken, data),
            setIsLoading,
            () => {
                showNotification(
                    "success",
                    "Password reset successfully! Go ahead and login."
                );
                navigate("/login", { replace: true }); // Redirect to the login page after successful registration
            },
            (errorMsg) => showNotification("error", errorMsg)
        );
    };

    // Function to handle user logout
    const logout = async () => {
        await requestHandler(
            async () => await logoutUser(),
            () => {},
            () => {
                setUser(null);
                setToken(null);
                LocalStorage.clear(); // Clear local storage on logout
                navigate("/login", { replace: true }); // Redirect to the login page after successful logout
            },
            (errorMsg) => showNotification("error", errorMsg)
        );
    };

    // Check for saved user and token in local storage during component initialization
    useEffect(() => {
        setIsLoading(true);
        const _token = LocalStorage.get("token");
        const _user = LocalStorage.get("user");
        if (_token && _user?._id) {
            setUser(_user);
            setToken(_token);
        }
        setIsLoading(false);
    }, []);

    // Provide authentication-related data and functions through the context
    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                register,
                updateUserDetails,
                changePassword,
                forgotPassword,
                resetPassword,
                logout,
                token,
            }}
        >
            {/* Display a loader while loading */}
            {isLoading ? <Loader /> : children}
        </AuthContext.Provider>
    );
};

// Export the context, provider component, and custom hook
export { AuthContext, AuthProvider, useAuth };
