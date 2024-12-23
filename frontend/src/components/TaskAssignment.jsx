import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function TaskAssignment() {
    const [candidateId, setCandidateId] = useState('');
    const [projectId, setProjectId] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/tasks', {
                candidateId,
                projectId,
                description,
            });

            // Show success toast
            toast.success('Task assigned successfully!', {
                position: 'top-right',
                autoClose: 1000,
            });

            // Navigate back to Main Page after 3 seconds
            setTimeout(() => {
                navigate('/');
            }, 3000);

            // Clear input fields
            setCandidateId('');
            setProjectId('');
            setDescription('');
        } catch (error) {
            // Show error toast
            toast.error('Failed to assign task. Please try again.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            {/* Toastify Container */}
            <ToastContainer />

            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Assign a Task</h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Candidate ID Input */}
                    <div>
                        <label htmlFor="candidateId" className="block text-sm font-medium text-gray-700">
                            Candidate ID
                        </label>
                        <input
                            id="candidateId"
                            type="text"
                            placeholder="Enter Candidate ID"
                            value={candidateId}
                            onChange={(e) => setCandidateId(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    {/* Project ID Input */}
                    <div>
                        <label htmlFor="projectId" className="block text-sm font-medium text-gray-700">
                            Project ID
                        </label>
                        <input
                            id="projectId"
                            type="text"
                            placeholder="Enter Project ID"
                            value={projectId}
                            onChange={(e) => setProjectId(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    {/* Task Description Input */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Task Description
                        </label>
                        <textarea
                            id="description"
                            placeholder="Enter Task Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Assign Task
                    </button>
                </form>
            </div>
        </div>
    );
}

export default TaskAssignment;
