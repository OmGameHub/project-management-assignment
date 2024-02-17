import React, { useEffect, useRef, useState } from "react";
import { Button, Input, Modal } from "antd";

import { useProjectContext } from "../../../context/ProjectContext";

const ProjectModal = ({ isOpen, projectId = null, handleClose = () => {} }) => {
    const prevProps = useRef();

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        title: "",
        description: "",
    });
    const { createProject } = useProjectContext();

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
        await createProject(data, setIsLoading);
    };

    return (
        <Modal
            title={`${!projectId ? "Create" : "Update"} Project`}
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
            {/* Input for entering the title */}
            <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Title
                </label>

                <Input
                    size="large"
                    placeholder="Title"
                    value={data.title}
                    onChange={handleChange("title")}
                />
            </div>

            {/* Input for entering the description */}
            <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Description
                </label>

                <Input.TextArea
                    size="large"
                    placeholder="Description"
                    value={data.description}
                    onChange={handleChange("description")}
                    rows={2}
                />
            </div>
        </Modal>
    );
};

export default ProjectModal;
