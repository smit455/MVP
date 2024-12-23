import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function MainPage() {
    const [candidateId, setCandidateId] = useState('');
    const [projectId, setProjectId] = useState('');
    const [tasks, setTasks] = useState([]);
    const [greeting, setGreeting] = useState('');
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        if (!candidateId) {
            alert('Please enter a Candidate ID to proceed.');
            return;
        }
        navigate(path);
    };

    const fetchTasks = async (e) => {
        e.preventDefault();
        if (!projectId) {
            alert('Please enter a Project ID to fetch tasks.');
            return;
        }
        try {
            const response = await axios.get(`http://localhost:5000/tasks/${projectId}`);
            setTasks(response.data);
        } catch (error) {
            alert('Failed to fetch tasks.');
        }
    };

    const handleCandidateChange = (e) => {
        const value = e.target.value;
        setCandidateId(value);

        if (value) {
            setGreeting(`Hello, Candidate ${value}!`);
        } else {
            setGreeting('');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Page Header */}
            <header className="text-center mb-8">
                <h1 className="text-5xl font-extrabold text-blue-600">Project Management System</h1>
                <p className="text-gray-600 text-lg mt-2">Welcome to the candidate project and task tracker!</p>
            </header>

            {/* Dynamic Greeting */}
            {greeting && (
                <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6 rounded max-w-md mx-auto">
                    <p className="font-semibold text-lg text-center">{greeting}</p>
                </div>
            )}

            {/* Input Section */}
            <form
                onSubmit={fetchTasks}
                className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto mb-8 space-y-6"
            >
                <div>
                <label htmlFor="candidateId" className="block text-lg font-semibold text-gray-800 bg-gray-200 px-4 py-2 rounded-lg shadow-md mb-2">
                    Candidate ID
                </label>

                    <input
                        id="candidateId"
                        type="text"
                        placeholder="Enter Candidate ID"
                        value={candidateId}
                        onChange={handleCandidateChange}
                        className="mt-2 w-full h-16 text-lg border-gray-300 rounded-lg shadow-md p-4 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="projectId" className="block text-lg font-semibold text-gray-800 bg-gray-200 px-4 py-2 rounded-lg shadow-md mb-2">
                        Project ID
                    </label>
                    <input
                        id="projectId"
                        type="text"
                        placeholder="Enter Project ID"
                        value={projectId}
                        onChange={(e) => setProjectId(e.target.value)}
                        className="mt-2 w-full h-16 text-lg border-gray-300 rounded-lg shadow-md p-4 focus:ring-blue-500 focus:border-blue-500"
                    />

                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Fetch Tasks
                </button>
            </form>

            {/* Navigation Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
                <button
                    onClick={() => handleNavigation(`/projects/${candidateId}`)}
                    className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg shadow hover:bg-blue-600 transition"
                >
                    View Your Projects
                </button>
                <button
                    onClick={() => handleNavigation(`/progress/${candidateId}`)}
                    className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg shadow hover:bg-blue-600 transition"
                >
                    Track Your Progress
                </button>
                <button
                    onClick={() =>
                        handleNavigation(projectId ? `/tasks/${projectId}` : `/projects/${candidateId}`)
                    }
                    className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg shadow hover:bg-blue-600 transition"
                >
                    Manage Tasks
                </button>
                <button
                    onClick={() => navigate('/assign-task')}
                    className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg shadow hover:bg-green-600 transition"
                >
                    Assign a New Task
                </button>
            </div>

            {/* Task Preview Section */}
            {tasks.length > 0 && (
                <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
                        Tasks for Project {projectId}
                    </h2>
                    <ul className="divide-y divide-gray-200">
                        {tasks.map((task) => (
                            <li
                                key={task._id}
                                className="py-4 flex justify-between items-center"
                            >
                                <div>
                                    <p className="text-lg font-semibold">{task.description}</p>
                                    <p
                                        className={`text-sm font-medium ${
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
                </div>
            )}
        </div>
    );
}

export default MainPage;
