# Project Management System

## Overview
This application is a project management system designed to handle projects and tasks efficiently. It includes separate views for admins and candidates to manage and track progress. The backend is built using Express.js and MongoDB, while the frontend is developed using React.

---

## Features
- **Admin View:**
  - Fetch all projects.
  - Assign projects to candidates.
  - Update project status.

- **Candidate View:**
  - Fetch projects assigned to a candidate.
  - Fetch tasks for a project.
  - Track progress and view scores.

- **General Features:**
  - Create, update, and manage tasks.
  - Progress tracker with score calculation.

---

## Tech Stack
### Backend:
- **Framework:** Express.js
- **Database:** MongoDB
- **Environment Variables Management:** dotenv
- **Other Tools:** cors, mongoose

### Frontend:
- **Library:** React
- **Routing:** React Router

---

## Prerequisites
Ensure you have the following installed:
- Node.js
- npm (Node Package Manager)
- MongoDB

---

## Installation and Setup

### Backend Setup:
1. Clone the repository.
   ```bash
   git clone https://github.com/smit455/MVP.git
   cd MVP/backend
   ```
2. Install dependencies.
   ```bash
   npm install
   ```
3. Create a `.env` file in the root folder and add the following environment variable:
   ```env
   DB_URI=<your-mongodb-connection-string>
   ```
4. Start the server.
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000`.

### Frontend Setup:
1. Navigate to the `frontend` folder.
   ```bash
   cd ../frontend
   ```
2. Install dependencies.
   ```bash
   npm install
   ```
3. Start the frontend.
   ```bash
   npm start
   ```
   The application will run on `http://localhost:3000`.

---

## API Endpoints

### Projects:
- **GET** `/projects` - Fetch all projects (Admin view).
- **GET** `/projects/:candidateId` - Fetch projects assigned to a candidate.
- **POST** `/projects` - Assign a new project.
- **PATCH** `/projects/:id` - Update project status.

### Tasks:
- **GET** `/tasks/:projectId` - Fetch tasks for a project.
- **GET** `/tasks/candidate/:candidateId` - Fetch tasks for a candidate.
- **POST** `/tasks` - Assign a new task.
- **PATCH** `/tasks/:id` - Update task status.

### Progress:
- **GET** `/progress/:candidateId` - Get progress and score for a candidate.

---

## Frontend Routes
- `/` - Main Page
- `/assign-task` - Task Assignment Page
- `/projects/:candidateId` - Candidate’s Project List
- `/tasks/:projectId` - Task List for a Project
- `/progress/:candidateId` - Candidate’s Progress Tracker

---

## Usage
1. **Admin Workflow:**
   - Assign new projects and tasks using the `/assign-task` route.
   - View all projects and update statuses as needed.

2. **Candidate Workflow:**
   - Check assigned projects.
   - View and manage tasks for a specific project.
   - Track progress and score.
