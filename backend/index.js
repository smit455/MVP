const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Models
const ProjectSchema = new mongoose.Schema({
    name: String,
    description: String,
    assignedTo: String,
    status: { type: String, default: 'pending' },
});
const Project = mongoose.model('Project', ProjectSchema);

const TaskSchema = new mongoose.Schema({
    projectId: String,
    candidateId: String,
    description: String,
    status: { type: String, default: 'pending' },
    score: { type: Number, default: 10 },
});
const Task = mongoose.model('Task', TaskSchema);

// Routes
// Fetch all projects (admin view)
app.get('/projects', async (req, res) => {
    const projects = await Project.find();
    res.json(projects);
});

// Fetch projects assigned to a specific candidate
app.get('/projects/:candidateId', async (req, res) => {
    const projects = await Project.find({ assignedTo: req.params.candidateId });
    res.json(projects);
});

// Assign a new project
app.post('/projects', async (req, res) => {
    const project = new Project(req.body);
    await project.save();
    res.json(project);
});

// Update project status
app.patch('/projects/:id', async (req, res) => {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(project);
});

// Fetch tasks for a projectn
app.get('/tasks/:projectId', async (req, res) => {
    const tasks = await Task.find({ projectId: req.params.projectId });
    res.json(tasks);
});

app.post('/tasks', async (req, res) => {
    try {
        const { projectId, candidateId, description } = req.body;
        const task = new Task({
            projectId,
            candidateId,
            description,
            status: 'pending',
        });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: 'Failed to assign task' });
    }
});

// Update task status
app.patch('/tasks/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update task status' });
    }
});


// Get progress and score for a candidate
app.get('/progress/:candidateId', async (req, res) => {
    const tasks = await Task.find({ candidateId: req.params.candidateId });
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    const score = (completedTasks / totalTasks) * 100;

    res.json({
        candidateId: req.params.candidateId,
        totalTasks,
        completedTasks,
        score,
    });
});

app.get('/tasks/candidate/:candidateId', async (req, res) => {
    try {
        const { candidateId } = req.params;
        const tasks = await Task.find({ candidateId });
        if (tasks.length === 0) {
            return res.status(404).json({ message: 'No tasks found for this candidate' });
        }
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks for the candidate' });
    }
});

// Start Server
app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
