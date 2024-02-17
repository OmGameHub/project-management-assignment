import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProjectRequest, getProjects } from "../api";
import Loader from "../components/Loader";
import { requestHandler, showNotification } from "../utils";

// Create a context to manage projects-related data and functions
const ProjectContext = createContext({
    projectMap: {},
    list: [],
    getAllProjects: async () => {},
    createProject: async () => {},
});

// Create a hook to access the ProjectContext
const useProjectContext = () => useContext(ProjectContext);

// Create a component that provides project-related data and functions
const ProjectProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [projectMap, setProjectMap] = useState({});
    const [list, setList] = useState([]);
    const metaData = {};

    // Function to handle get all projects
    const getAllProjects = async (page = 1, limit = 100) => {
        await requestHandler(
            async () => await getProjects({ page, limit }),
            null,
            (res) => {
                const { data } = res;
                const { projects = [], totalProjects = 0 } = data;

                const projectMap = projects.reduce((map, project) => {
                    map[project._id] = project;
                    return map;
                }, {});
                const projectIds = projects.map((project) => project._id);
                metaData.totalProjects = totalProjects;

                if (page <= 1) {
                    setProjectMap(projectMap);
                    setList(projectIds);
                } else {
                    setProjectMap((previewProjectMap) =>
                        Object.assign({}, projectMap, previewProjectMap)
                    );
                    setList((prevProjectIds) => [
                        ...prevProjectIds,
                        ...projectIds,
                    ]);
                }
            },
            (errorMsg) => showNotification("error", errorMsg)
        );
    };

    // Function to handle create project
    const createProject = async (data, setIsLoading) => {
        await requestHandler(
            async () => await createProjectRequest(data),
            setIsLoading,
            (res) => {
                const { data } = res;
                const projectId = data._id;

                setProjectMap((previewProjectMap) => ({
                    ...previewProjectMap,
                    [projectId]: data,
                }));
                setList((prevList) => [...prevList, projectId]);
            },
            (errorMsg) => showNotification("error", errorMsg)
        );
    };

    useEffect(() => {
        setIsLoading(true);
        getAllProjects();
        setIsLoading(false);
    }, []);

    // Provide project-related data and functions through the context
    return (
        <ProjectContext.Provider
            value={{ projectMap, list, getAllProjects, createProject }}
        >
            {/* Display a loader while loading */}
            {isLoading ? <Loader /> : children}
        </ProjectContext.Provider>
    );
};

// Export the context, provider component, and custom hook
export { ProjectContext, ProjectProvider, useProjectContext };
