import axios from "axios";
import { LocalStorage } from "../utils";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URI,
    withCredentials: true,
    timeout: 120000,
});

apiClient.interceptors.request.use(
    function (config) {
        const token = LocalStorage.get("token");
        config.headers.Authorization = `Bearer ${token}`;

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// API functions for different actions
const loginUser = (data) => {
    return apiClient.post("/users/login", data);
};

const registerUser = (data) => {
    return apiClient.post("/users/register", data);
};

const updateUser = (data) => {
    return apiClient.patch("/users/update-account", data);
};

const changeUserPassword = (data) => {
    return apiClient.post("/users/change-password", data);
};

const forgotPasswordRequest = (data) => {
    return apiClient.post("/users/forget-password", data);
};

const resetUserPassword = (resetToken, data) => {
    return apiClient.post(`/users/reset-password/${resetToken}`, data);
};

const logoutUser = () => {
    return apiClient.post("/users/logout");
};

// project apis
const getProjects = (params) => {
    return apiClient.get(`/projects`, { params });
};

const createProjectRequest = (data) => {
    return apiClient.post("/projects", data);
};

const updateProjectRequest = (data) => {
    return apiClient.patch(`/projects/${data._id}`, data);
};

// Export all the API functions
export {
    loginUser,
    logoutUser,
    registerUser,
    changeUserPassword,
    updateUser,
    forgotPasswordRequest,
    resetUserPassword,
    createProjectRequest,
    updateProjectRequest,
    getProjects,
};
