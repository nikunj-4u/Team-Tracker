import React, { useState } from 'react';
import './TaskForm.css';

function TaskForm({ employees, onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Development');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('Pending');
  const [assignedTo, setAssignedTo] = useState([]);
  const [dueDate, setDueDate] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!title || !description || !dueDate) {
      alert('Please fill all required fields.');
      return;
    }
    
    // Create new task object
    const newTask = {
      title,
      description,
      category,
      priority,
      status,
      assignedTo: assignedTo.map(id => parseInt(id)),
      dueDate: new Date(dueDate).toISOString()
    };
    
    // Call the onSubmit callback
    onSubmit(newTask);
    
    // Reset form
    setTitle('');
    setDescription('');
    setCategory('Development');
    setPriority('Medium');
    setStatus('Pending');
    setAssignedTo([]);
    setDueDate('');
  };
  
  const handleAssigneeChange = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      option => option.value
    );
    setAssignedTo(value);
  };
  
  return (
    <div className="task-form-container">
      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="form-label">Title *</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description" className="form-label">Description *</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task description"
            rows="4"
            required
          ></textarea>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category" className="form-label">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Development">Development</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Documentation">Documentation</option>
              <option value="Bug Fix">Bug Fix</option>
              <option value="Research">Research</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="priority" className="form-label">Priority</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="status" className="form-label">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="dueDate" className="form-label">Due Date *</label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="assignedTo" className="form-label">Assign To</label>
          <select
            id="assignedTo"
            multiple
            value={assignedTo}
            onChange={handleAssigneeChange}
            className="multi-select"
          >
            {employees.map(employee => (
              <option key={employee.id} value={employee.id}>
                {employee.name} ({employee.department})
              </option>
            ))}
          </select>
          <small className="form-hint">Hold Ctrl/Cmd to select multiple employees</small>
        </div>
        
        <button type="submit" className="btn-primary submit-btn">
          Add Task
        </button>
      </form>
    </div>
  );
}

export default TaskForm; 