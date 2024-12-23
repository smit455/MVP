import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TaskList() {
    const { projectId } = useParams();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/tasks/${projectId}`)
            .then((response) => {
                setTasks(response.data);
            })
            .catch(() => {
                toast.error('Failed to fetch tasks. Please try again.', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            });
    }, [projectId]);

    const toggleTaskCompletion = (id, currentStatus) => {
        const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
        axios
            .patch(`http://localhost:5000/tasks/${id}`, { status: newStatus })
            .then(() => {
                setTasks(
                    tasks.map((task) =>
                        task._id === id ? { ...task, status: newStatus } : task
                    )
                );
                toast.success(
                    `Task marked as ${newStatus === 'completed' ? 'Completed' : 'Pending'}!`,
                    {
                        position: 'top-right',
                        autoClose: 3000,
                    }
                );
            })
            .catch(() => {
                toast.error('Failed to update task status. Please try again.', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            });
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Toastify Container */}
            <ToastContainer />

            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
                    Tasks for Project {projectId}
                </h1>
                {tasks.length > 0 ? (
                    <ul className="space-y-4 divide-y divide-gray-200">
                        {tasks.map((task) => (
                            <li
                                key={task._id}
                                className="py-4 flex justify-between items-center"
                            >
                                <div>
                                    <p className="text-lg font-semibold">{task.description}</p>
                                    <p
                                        className={`text-sm ${
                                            task.status === 'completed'
                                                ? 'text-green-600'
                                                : 'text-red-600'
                                        }`}
                                    >
                                        {task.status}
                                    </p>
                                </div>
                                <button
                                    onClick={() => toggleTaskCompletion(task._id, task.status)}
                                    className={`px-4 py-2 rounded-lg shadow ${
                                        task.status === 'completed'
                                            ? 'bg-red-500 text-white hover:bg-red-600'
                                            : 'bg-blue-500 text-white hover:bg-blue-600'
                                    }`}
                                >
                                    {task.status === 'completed'
                                        ? 'Mark as Pending'
                                        : 'Mark as Completed'}
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 text-center">No tasks found for this project.</p>
                )}
            </div>
        </div>
    );
}

export default TaskList;
