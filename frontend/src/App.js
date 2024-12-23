import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProjectList from './components/ProjectList';
import TaskList from './components/TaskList';
import ProgressTracker from './components/ProgressTracker';
import MainPage from './components/MainPage';
import TaskAssignment from './components/TaskAssignment';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/assign-task" element={<TaskAssignment />} />
                <Route path="/projects/:candidateId" element={<ProjectList />} />
                <Route path="/tasks/:projectId" element={<TaskList />} />
                <Route path="/progress/:candidateId" element={<ProgressTracker />} />
            </Routes>
        </Router>
    );
}

export default App;