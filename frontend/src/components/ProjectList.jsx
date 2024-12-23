import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CandidateTaskList() {
    const { candidateId } = useParams();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/tasks/candidate/${candidateId}`);
                setTasks(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch tasks. Please try again.');
                toast.error('Failed to fetch tasks. Please try again.', {
                    position: 'top-right',
                    autoClose: 3000,
                });
                setLoading(false);
            }
        };

        fetchTasks();
    }, [candidateId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-xl font-semibold text-gray-500">Loading tasks...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-xl font-semibold text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Toastify Container */}
            <ToastContainer />

            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
                    Tasks for Candidate {candidateId}
                </h1>
                {tasks.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
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
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 text-center">No tasks found for this candidate.</p>
                )}
            </div>
        </div>
    );
}

export default CandidateTaskList;
