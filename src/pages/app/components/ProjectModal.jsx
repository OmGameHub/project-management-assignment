import React, { useEffect, useRef, useState } from "react";
import { Button, Input, Modal } from "antd";

import { useProjectContext } from "../../../context/ProjectContext";
import { showNotification } from "../../../utils";

const ProjectModal = ({ isOpen, projectId = null, handleClose = () => {} }) => {
    const prevProps = useRef();

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        title: "",
        description: "",
    });
    const { createProject, updateProject, projectMap } = useProjectContext();

    useEffect(() => {
        if (!isLoading && prevProps.current?.isLoading) {
            handleClose();
            setData({
                title: "",
                description: "",
            });
        }

        return () => {
            prevProps.current = {
                isLoading,
            };
        };
    }, [isLoading]);

    useEffect(() => {
        const project = projectMap[projectId];

        if (project) {
            setData({
                _id: project._id,
                title: project.title,
                description: project.description,
            });
        } else {
            setData({
                title: "",
                description: "",
            });
        }
    }, [projectId]);

    const handleChange = (name) => (e) => {
        setData({
            ...data,
            [name]: e.target.value,
        });
    };

    const onSave = async () => {
        if (isLoading) return;

        if (Object.values(data).some((val) => !val)) {
            showNotification("error", "All fields are required");
            return;
        }

        if (projectId) {
            await updateProject(data, setIsLoading);
        } else {
            await createProject(data, setIsLoading);
        }
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
