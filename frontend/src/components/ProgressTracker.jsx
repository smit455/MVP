import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProgressTracker() {
    const { candidateId } = useParams();
    const [progress, setProgress] = useState(null);

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/progress/${candidateId}`);
                setProgress(response.data);
            } catch (error) {
                toast.error('Failed to fetch progress data. Please try again later.', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            }
        };

        fetchProgress();
    }, [candidateId]);

    if (!progress) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <p className="text-xl font-bold text-gray-500">Loading progress...</p>
                <ToastContainer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Toastify Container */}
            <ToastContainer />

            <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
                    Progress Tracker for Candidate {candidateId}
                </h1>
                <div className="p-6 bg-gray-100 rounded-lg shadow">
                    <p className="text-lg font-medium">
                        <span className="font-semibold">Total Tasks:</span> {progress.totalTasks}
                    </p>
                    <p className="text-lg font-medium">
                        <span className="font-semibold">Completed Tasks:</span>{' '}
                        {progress.completedTasks}
                    </p>
                    <p className="text-lg font-medium">
                        <span className="font-semibold">Score:</span>{' '}
                        <span
                            className={`${
                                progress.score >= 80
                                    ? 'text-green-500'
                                    : progress.score >= 50
                                    ? 'text-yellow-500'
                                    : 'text-red-500'
                            } font-bold`}
                        >
                            {progress.score}%
                        </span>
                    </p>
                </div>
                <div className="mt-6">
                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className={`h-full ${
                                progress.score >= 80
                                    ? 'bg-green-500'
                                    : progress.score >= 50
                                    ? 'bg-yellow-500'
                                    : 'bg-red-500'
                            }`}
                            style={{ width: `${progress.score}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProgressTracker;
