import React, { useState } from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

function TaskList({ tasks, isAdmin = false, employees = [] }) {
  const [updatedTasks, setUpdatedTasks] = useState(tasks);
  
  // Sort tasks by priority (Critical, High, Medium, Low)
  const priorityOrder = { "Critical": 0, "High": 1, "Medium": 2, "Low": 3 };
  
  const sortedTasks = [...updatedTasks].sort((a, b) => {
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const handleStatusChange = (taskId, newStatus) => {
    const updatedTasksList = updatedTasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setUpdatedTasks(updatedTasksList);
    
    // In a real app, you would send this update to a server
    console.log(`Task ${taskId} status updated to: ${newStatus}`);
  };

  return (
    <div className="task-list">
      {sortedTasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task} 
          isAdmin={isAdmin}
          employees={employees}
          onStatusChange={handleStatusChange}
        />
      ))}
    </div>
  );
}

export default TaskList; 