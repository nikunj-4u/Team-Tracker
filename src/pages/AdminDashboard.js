import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  getTasks, 
  getEmployees, 
  addTask, 
  addUser, 
  updateTaskStatus 
} from '../services/DataService';
import TaskList from '../components/TaskList';
import EmployeeList from '../components/EmployeeList';
import TaskForm from '../components/TaskForm';
import AddEmployeeForm from '../components/AddEmployeeForm';
import Communication from '../components/Communication';
import DarkModeToggle from '../components/DarkModeToggle';
import NewUsersList from '../components/NewUsersList';
import './Dashboard.css';

function AdminDashboard() {
  const { currentUser, logout, isAdmin } = useAuth();
  const [allTasks, setAllTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [activeTab, setActiveTab] = useState('tasks');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if not logged in as admin
    if (!currentUser) {
      navigate('/');
      return;
    }

    if (!isAdmin) {
      navigate('/');
      return;
    }

    // Get all tasks and employees from data service
    setAllTasks(getTasks());
    setEmployees(getEmployees());
    
    setIsLoading(false);
  }, [currentUser, isAdmin, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAddTask = (newTask) => {
    // Add task to data service
    const task = addTask({
      ...newTask,
      createdBy: currentUser.id,
      createdAt: new Date().toISOString(),
    });
    
    // Update local state
    setAllTasks([...allTasks, task]);
  };

  const handleAddEmployee = (newEmployee) => {
    // Add employee to data service
    const employee = addUser({
      ...newEmployee,
      role: 'employee',
      managerId: currentUser.id
    });
    
    // Update local state
    setEmployees([...employees, employee]);
  };

  const handleTaskStatusChange = (taskId, newStatus) => {
    // Update task status in data service
    const updatedTask = updateTaskStatus(taskId, newStatus);
    
    // Update local state
    setAllTasks(allTasks.map(task => 
      task.id === taskId ? updatedTask : task
    ));
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard admin-dashboard">
      <header className="dashboard-header">
        <div className="user-info">
          <h2>{currentUser.name}</h2>
          <span>Administrator</span>
        </div>
        <div className="header-actions">
          <DarkModeToggle />
          <button onClick={handleLogout} className="btn-danger logout-btn">
            Logout
          </button>
        </div>
      </header>

      <nav className="dashboard-nav">
        <button 
          className={`nav-tab ${activeTab === 'tasks' ? 'active' : ''}`}
          onClick={() => setActiveTab('tasks')}
        >
          Tasks
        </button>
        <button 
          className={`nav-tab ${activeTab === 'employees' ? 'active' : ''}`}
          onClick={() => setActiveTab('employees')}
        >
          Employees
        </button>
        <button 
          className={`nav-tab ${activeTab === 'add-task' ? 'active' : ''}`}
          onClick={() => setActiveTab('add-task')}
        >
          Add Task
        </button>
        <button 
          className={`nav-tab ${activeTab === 'add-employee' ? 'active' : ''}`}
          onClick={() => setActiveTab('add-employee')}
        >
          Add Employee
        </button>
        <button 
          className={`nav-tab ${activeTab === 'communication' ? 'active' : ''}`}
          onClick={() => setActiveTab('communication')}
        >
          Team Chat
        </button>
      </nav>

      <main className="dashboard-content">
        {activeTab === 'tasks' && (
          <>
            <div className="dashboard-title">
              <h1>All Tasks</h1>
            </div>
            <TaskList 
              tasks={allTasks} 
              isAdmin={true} 
              employees={employees}
              onStatusChange={handleTaskStatusChange}
            />
          </>
        )}

        {activeTab === 'employees' && (
          <>
            <div className="dashboard-title">
              <h1>Employees</h1>
            </div>
            <EmployeeList 
              employees={employees} 
              tasks={allTasks}
            />
            <NewUsersList />
          </>
        )}

        {activeTab === 'add-task' && (
          <>
            <div className="dashboard-title">
              <h1>Add New Task</h1>
            </div>
            <TaskForm 
              employees={employees} 
              onSubmit={handleAddTask}
            />
          </>
        )}

        {activeTab === 'add-employee' && (
          <>
            <div className="dashboard-title">
              <h1>Add New Employee</h1>
            </div>
            <AddEmployeeForm onSubmit={handleAddEmployee} />
            <NewUsersList />
          </>
        )}

        {activeTab === 'communication' && (
          <>
            <div className="dashboard-title">
              <h1>Team Communication</h1>
            </div>
            <Communication />
          </>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard; 