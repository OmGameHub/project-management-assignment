import React from "react";
import { Spin } from "antd";

const Loader = () => {
    return (
        <div className="w-screen flex justify-center">
            <Spin size="large" />
        </div>
    );
};

export default Loader;
