import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    createProjectRequest,
    updateProjectRequest,
    deleteProjectRequest,
    getProjects,
} from "../api";
import Loader from "../components/Loader";
import { requestHandler, showNotification } from "../utils";

// Create a context to manage projects-related data and functions
const ProjectContext = createContext({
    isLoading: false,
    projectMap: {},
    list: [],
    metaData: {},
    getAllProjects: async () => {},
    loadMoreProjects: async () => {},
    createProject: async () => {},
    updateProject: async () => {},
    deleteProject: async () => {},
});

// Create a hook to access the ProjectContext
const useProjectContext = () => useContext(ProjectContext);

// Create a component that provides project-related data and functions
const ProjectProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [projectMap, setProjectMap] = useState({});
    const [list, setList] = useState([]);
    const [metaData, setMetaData] = useState({});

    // Function to handle get all projects
    const getAllProjects = async (page = 1, limit = 20) => {
        if (isLoading) return;
        await requestHandler(
            async () => await getProjects({ page, limit }),
            setIsLoading,
            (res) => {
                const { data } = res;
                const { projects = [], ...metaDataDetails } = data;

                const projectMap = projects.reduce((map, project) => {
                    map[project._id] = project;
                    return map;
                }, {});
                const projectIds = projects.map((project) => project._id);
                setMetaData(metaDataDetails);

                if (page <= 1) {
                    setProjectMap(projectMap);
                    setList(projectIds);
                } else {
                    setProjectMap((previewProjectMap) =>
                        Object.assign({}, projectMap, previewProjectMap)
                    );

                    setList((prevProjectIds) => [
                        ...new Set([...prevProjectIds, ...projectIds]),
                    ]);
                }
            },
            (errorMsg) => showNotification("error", errorMsg)
        );
    };

    const loadMoreProjects = async () => {
        const { nextPage, hasNextPage = false } = metaData;
        if (isLoading && !hasNextPage) return;
        await getAllProjects(nextPage);
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
                setList((prevList) => [projectId, ...prevList]);
                setMetaData((prevMetaData) => ({
                    ...prevMetaData,
                    totalProjects: (prevMetaData?.totalProjects ?? 0) + 1,
                }));
            },
            (errorMsg) => showNotification("error", errorMsg)
        );
    };

    // Function to handle update project details
    const updateProject = async (data, setIsLoading) => {
        await requestHandler(
            async () => await updateProjectRequest(data),
            setIsLoading,
            (res) => {
                const { data } = res;
                const projectId = data._id;

                setProjectMap((previewProjectMap) => ({
                    ...previewProjectMap,
                    [projectId]: data,
                }));
            },
            (errorMsg) => showNotification("error", errorMsg)
        );
    };

    // Function to handle delete project
    const deleteProject = async (projectId, setIsLoading) => {
        await requestHandler(
            async () => await deleteProjectRequest(projectId),
            setIsLoading,
            (res) => {
                const { message } = res;
                setList((prevList) =>
                    prevList.filter((id) => id !== projectId)
                );
                setMetaData((prevMetaData) => ({
                    ...prevMetaData,
                    totalProjects: (prevMetaData?.totalProjects ?? 1) - 1,
                }));
                showNotification("success", message);
            },
            (errorMsg) => showNotification("error", errorMsg)
        );
    };

    useEffect(() => {
        getAllProjects();
    }, []);

    // Provide project-related data and functions through the context
    return (
        <ProjectContext.Provider
            value={{
                isLoading,
                projectMap,
                list,
                metaData,
                getAllProjects,
                loadMoreProjects,
                createProject,
                updateProject,
                deleteProject,
            }}
        >
            {/* Display a loader while loading */}
            {isLoading && !list.length ? <Loader /> : children}
        </ProjectContext.Provider>
    );
};

// Export the context, provider component, and custom hook
export { ProjectContext, ProjectProvider, useProjectContext };
