import React, { useEffect, useRef, useState } from "react";
import { Button, Empty, Row, Spin } from "antd";
import ProjectModal from "./components/ProjectModal";
import { useProjectContext } from "../../context/ProjectContext";
import moment from "moment";
import { useOnScreen } from "../../utils/customHooks";

const Dashboard = () => {
    const loadMoreRef = useRef(null);
    const isVisible = useOnScreen(loadMoreRef);

    const [showModal, setShowModal] = useState(false);

    const { isLoading, list, projectMap, metaData, loadMoreProjects } =
        useProjectContext();

    useEffect(() => {
        if (isVisible) {
            loadMoreProjects();
        }

        return () => {};
    }, [isVisible]);

    return (
        <div className="bg-white overflow-hidden">
            <Row align="middle" className="px-4">
                <h1 className="flex-1 text-2xl font-bold text-gray-900">
                    Projects
                </h1>

                <Button type="primary" onClick={() => setShowModal(true)}>
                    New Project
                </Button>
            </Row>

            <div className="h-[90vh] min-w-full border-b border-gray-200 align-middle overflow-y-auto">
                <table className="min-w-full border-collapse border border-slate-500 mb-8">
                    <thead className="sticky top-0">
                        <tr className="border-t border-gray-200">
                            <th className="border-b border-gray-200 bg-gray-200 px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                <span className="lg:pl-2">Projects</span>
                            </th>

                            <th className="border-b border-gray-200 bg-gray-200 px-6 py-3 text-right text-sm font-semibold text-gray-900">
                                Created At
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-900 ">
                        {list.map((projectId) => {
                            const { title, createdAt } = projectMap[projectId];

                            return (
                                <tr
                                    key={projectId}
                                    className={`border border-b-2 border-gray-800 even:bg-gray-50`}
                                >
                                    <td className="w-full max-w-0 whitespace-nowrap px-6 py-3 text-sm font-medium text-gray-900">
                                        {title}
                                    </td>

                                    <td className="whitespace-nowrap px-6 py-3 text-right text-sm text-gray-500">
                                        {moment(createdAt).format(
                                            "MMM DD, yyyy"
                                        )}
                                    </td>
                                </tr>
                            );
                        })}

                        {!isLoading && metaData?.hasNextPage && (
                            <tr
                                ref={loadMoreRef}
                                className="border border-b-2 border-gray-800"
                            >
                                <td
                                    className="flex-1 align-middle justify-center px-6 py-3 text-sm font-medium text-gray-900 text-center"
                                    colSpan={2}
                                >
                                    <Button
                                        type="primary"
                                        block
                                        onClick={loadMoreProjects}
                                    >
                                        Load More
                                    </Button>
                                </td>
                            </tr>
                        )}

                        {isLoading && (
                            <tr
                                key={"loading"}
                                className="border border-b-2 border-gray-800"
                            >
                                <td
                                    className="flex-1 align-middle justify-center px-6 py-3 text-sm font-medium text-gray-900 text-center"
                                    colSpan={2}
                                >
                                    <Spin />
                                    <span className="ml-4">Loading...</span>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {list.length === 0 ? (
                    <Empty className="mt-10" description="No projects found" />
                ) : null}
            </div>

            <ProjectModal
                isOpen={showModal}
                handleClose={() => setShowModal(false)}
            />
        </div>
    );
};

export default Dashboard;
