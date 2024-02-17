import React from "react";
import { Input } from "antd";

const TextInput = ({
    labelClassName = "",
    label = "",
    className = "",
    ...props
}) => {
    return (
        <div className="mb-4">
            {label && (
                <label
                    htmlFor={props.name}
                    className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${labelClassName}`}
                >
                    {label}
                </label>
            )}

            <Input size="large" {...props} />
        </div>
    );
};

export default TextInput;
