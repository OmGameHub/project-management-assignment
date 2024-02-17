import React, { useState } from "react";
import { Button, Empty, Row } from "antd";
import ProjectModal from "./components/ProjectModal";
import { useProjectContext } from "../../context/ProjectContext";
import moment from "moment";

const Dashboard = () => {
    const [showModal, setShowModal] = useState(false);

    const { list, projectMap } = useProjectContext();

    return (
        <div className="bg-white h-full">
            <Row align="middle px-4">
                <h1 className="flex-1 text-2xl font-bold text-gray-900">
                    Projects
                </h1>

                <Button type="primary" onClick={() => setShowModal(true)}>
                    New Project
                </Button>
            </Row>

            <div className="h-full min-w-full border-b border-gray-200 align-middle overflow-auto">
                <table className="min-w-full border-collapse border border-slate-500 pb-8 ">
                    <thead className="">
                        <tr className="border-t border-gray-200">
                            <th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                <span className="lg:pl-2">Projects</span>
                            </th>

                            <th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900">
                                Created At
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-900 bg-white">
                        {list.map((projectId) => {
                            const project = projectMap[projectId];

                            return (
                                <tr
                                    key={projectId}
                                    className="border border-b-2 border-gray-800"
                                >
                                    <td className="w-full max-w-0 whitespace-nowrap px-6 py-3 text-sm font-medium text-gray-900 ">
                                        {project?.title}
                                    </td>

                                    <td className="whitespace-nowrap px-6 py-3 text-right text-sm text-gray-500">
                                        {moment(project?.createdAt).format(
                                            "MMM d, yyyy"
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
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
