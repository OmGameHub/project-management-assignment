import { notification } from "antd";

export const classNames = (...className) => {
    return className.filter(Boolean).join(" ");
};

export class LocalStorage {
    static get(key) {
        const value = localStorage.getItem(key);
        if (value) {
            try {
                return JSON.parse(value);
            } catch (err) {
                return null;
            }
        }
        return null;
    }

    static set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static remove(key) {
        localStorage.removeItem(key);
    }

    static clear() {
        localStorage.clear();
    }
}

export const showNotification = (type, message) => {
    notification[type]({
        message,
    });
};

export const requestHandler = async (api, setLoading, onSuccess, onError) => {
    setLoading && setLoading(true);
    try {
        const response = await api();
        const { data } = response;
        if (data?.success) {
            onSuccess(data);
        }
    } catch (error) {
        if ([401, 403].includes(error?.response.data?.statusCode)) {
            localStorage.clear();
            window.location.href = "/login";
        }

        const errorMessage =
            error?.response?.data?.message || "Something went wrong";
        onError(errorMessage);
    } finally {
        // Hide loading state if setLoading function is provided
        setLoading && setLoading(false);
    }
};
