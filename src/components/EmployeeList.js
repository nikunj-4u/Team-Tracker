import React from 'react';
import './EmployeeList.css';

function EmployeeList({ employees, tasks }) {
  const getEmployeeProgress = (employeeId) => {
    const assignedTasks = tasks.filter(task => 
      task.assignedTo.includes(employeeId)
    );
    
    if (assignedTasks.length === 0) return 0;
    
    const completedTasks = assignedTasks.filter(
      task => task.status === 'Completed'
    );
    
    return Math.round((completedTasks.length / assignedTasks.length) * 100);
  };

  const getEmployeeTaskCount = (employeeId) => {
    return tasks.filter(task => task.assignedTo.includes(employeeId)).length;
  };

  return (
    <div className="employee-list">
      {employees.map(employee => {
        const progress = getEmployeeProgress(employee.id);
        const taskCount = getEmployeeTaskCount(employee.id);
        
        return (
          <div key={employee.id} className="employee-card">
            <div className="employee-info">
              <h3>{employee.name}</h3>
              <div className="employee-meta">
                <span className="employee-department">{employee.department}</span>
                <span className="employee-email">{employee.email}</span>
              </div>
            </div>
            
            <div className="employee-stats">
              <div className="stat-item">
                <span className="stat-label">Tasks</span>
                <span className="stat-value">{taskCount}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Progress</span>
                <div className="progress-container">
                  <div 
                    className="progress-bar" 
                    style={{ width: `${progress}%` }}
                    data-progress={`${progress}%`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default EmployeeList; 