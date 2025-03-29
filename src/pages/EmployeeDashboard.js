import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getTasksByEmployeeId, updateTaskStatus } from '../services/DataService';
import TaskList from '../components/TaskList';
import Communication from '../components/Communication';
import DarkModeToggle from '../components/DarkModeToggle';
import './Dashboard.css';

function EmployeeDashboard() {
  const { currentUser, logout } = useAuth();
  const [employeeTasks, setEmployeeTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('tasks');
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if not logged in
    if (!currentUser) {
      console.log('No current user, redirecting to login');
      navigate('/');
      return;
    }

    // Check if user is an employee by role property
    if (currentUser.role !== 'employee') {
      console.log('Not an employee, redirecting to login');
      navigate('/');
      return;
    }

    console.log('Loading employee tasks for user:', currentUser.id);
    // Get tasks assigned to this employee
    const tasks = getTasksByEmployeeId(currentUser.id);
    setEmployeeTasks(tasks);
    setIsLoading(false);
  }, [currentUser, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleTaskStatusChange = (taskId, newStatus) => {
    // Update task status in data service
    const updatedTask = updateTaskStatus(taskId, newStatus);
    
    // Update local state
    setEmployeeTasks(employeeTasks.map(task => 
      task.id === taskId ? updatedTask : task
    ));
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="user-info">
          <h2>{currentUser.name}</h2>
          <span>{currentUser.department}</span>
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
          My Tasks
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
              <h1>Your Tasks</h1>
            </div>

            {employeeTasks.length === 0 ? (
              <div className="no-tasks">
                <p>You don't have any tasks assigned yet.</p>
              </div>
            ) : (
              <TaskList 
                tasks={employeeTasks} 
                onStatusChange={handleTaskStatusChange}
              />
            )}
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

export default EmployeeDashboard; 