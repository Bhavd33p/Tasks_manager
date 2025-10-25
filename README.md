# 📋 Task Manager - Full Stack Application

A modern, responsive Task Manager application built with React (Frontend) and .NET Core (Backend). Features a beautiful Bootstrap UI with gradient backgrounds, smooth animations, and real-time task management.

## 🎯 Features

- ✅ **Add Tasks**: Quickly add new tasks with a clean, intuitive interface
- ✅ **Mark Complete**: Toggle task completion status
- ✅ **Filter Tasks**: View all, active, or completed tasks
- ✅ **Delete Tasks**: Remove tasks with confirmation
- ✅ **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- ✅ **Modern UI**: Beautiful gradient background with Bootstrap styling
- ✅ **Real-time Updates**: Instant synchronization between frontend and backend
- ✅ **Local Storage**: Automatic backup to browser storage

## 🛠️ Tech Stack

### Frontend
- **React** 18+ with TypeScript
- **Bootstrap** 5 for styling
- **Bootstrap Icons** for beautiful icons
- **Axios** for API communication

### Backend
- **.NET 7.0** Web API
- Minimal API architecture
- In-memory data storage (ConcurrentDictionary)
- CORS enabled for cross-origin requests

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **.NET SDK 7.0** - [Download](https://dotnet.microsoft.com/download)
- **Git** - [Download](https://git-scm.com/)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd plc-taskmanager
```

### 2. Backend Setup

Navigate to the backend directory and restore dependencies:

```bash
cd backend
dotnet restore
```

The backend will automatically:
- Restore NuGet packages
- Build the project
- Set up the API

### 3. Frontend Setup

Open a new terminal, navigate to the frontend directory, and install dependencies:

```bash
cd frontend
npm install
```

This will install all required packages including:
- React and React DOM
- Bootstrap and Bootstrap Icons
- Axios
- TypeScript

## 🏃 Running the Application

### Option 1: Run Both Services Separately

**Terminal 1 - Start Backend:**
```bash
cd backend
dotnet run
```

The backend will start on `http://localhost:5202`

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm start
```

The frontend will start on `http://localhost:3000` and automatically open in your browser.

### Option 2: Run with Watch Mode (Development)

For development with auto-reload:

**Backend (with watch):**
```bash
cd backend
dotnet watch run
```

**Frontend (with hot reload):**
```bash
cd frontend
npm start
```

## 📁 Project Structure

```
plc-taskmanager/
├── backend/
│   ├── Program.cs              # Main API endpoints and logic
│   ├── backend.csproj          # Project file
│   └── appsettings.json        # Configuration
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx             # Main React component
│   │   ├── api.ts              # API service layer
│   │   ├── index.tsx           # Entry point
│   │   ├── index.css           # Global styles
│   │   └── styles.css          # Component styles
│   ├── package.json            # Dependencies
│   └── tsconfig.json           # TypeScript config
│
└── README.md                   # This file
```

## 🎨 Usage Guide

### Adding a Task
1. Type your task in the input field at the top
2. Click "Add Task" button or press Enter
3. Your task will appear in the list immediately

### Completing a Task
1. Click the checkbox next to any task
2. The task will be marked as completed (strikethrough style)

### Filtering Tasks
- **All**: Shows all tasks (default view)
- **Active**: Shows only incomplete tasks
- **Completed**: Shows only finished tasks

### Deleting a Task
1. Click the trash icon (🗑️) next to any task
2. Confirm the deletion in the popup
3. The task will be removed permanently

## 🔧 Configuration

### Backend API Configuration

The backend runs on port **5202** by default. To change this, edit:

```bash
backend/Properties/launchSettings.json
```

### Frontend API Configuration

The frontend connects to the backend API. To change the API URL, edit:

```javascript
// frontend/src/api.ts
axios.defaults.baseURL = "http://localhost:5202";
```

Or set an environment variable:
```bash
REACT_APP_API=http://localhost:5202 npm start
```

## 🧪 Testing the Application

### Backend API Endpoints

Test the API directly using curl or a tool like Postman:

```bash
# Get all tasks
curl http://localhost:5202/api/tasks

# Create a new task
curl -X POST http://localhost:5202/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"description":"Test task"}'

# Update a task
curl -X PUT http://localhost:5202/api/tasks/{id} \
  -H "Content-Type: application/json" \
  -d '{"description":"Updated task","isCompleted":true}'

# Delete a task
curl -X DELETE http://localhost:5202/api/tasks/{id}
```

## 📝 API Documentation

### GET /api/tasks
Returns all tasks.

**Response:**
```json
[
  {
    "id": "guid",
    "description": "Task description",
    "isCompleted": false
  }
]
```

### POST /api/tasks
Creates a new task.

**Request Body:**
```json
{
  "description": "Task description"
}
```

**Response:** Created task object

### PUT /api/tasks/{id}
Updates an existing task.

**Request Body:**
```json
{
  "description": "Updated description",
  "isCompleted": true
}
```

**Response:** Updated task object

### DELETE /api/tasks/{id}
Deletes a task.

**Response:** 204 No Content

## 🎨 Styling & Customization

### Customizing Colors

Edit `frontend/src/index.css` to change the gradient background:

```css
body {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Customizing Bootstrap Components

Edit `frontend/src/styles.css` to modify component styles.

## 🐛 Troubleshooting

### Backend won't start
- Ensure .NET SDK 7.0 is installed: `dotnet --version`
- Try cleaning and rebuilding: `dotnet clean && dotnet build`

### Frontend won't start
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear npm cache: `npm cache clean --force`

### API Connection Issues
- Verify backend is running on port 5202
- Check CORS settings in `backend/Program.cs`
- Ensure no firewall is blocking the connection

### Port Already in Use
- Backend: Change port in `launchSettings.json`
- Frontend: Set `PORT=3001 npm start` (or any available port)

## 📦 Building for Production

### Backend
```bash
cd backend
dotnet publish -c Release -o ./publish
```

### Frontend
```bash
cd frontend
npm run build
```

The built files will be in `frontend/build/` directory.

