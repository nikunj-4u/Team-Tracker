import React, { useState } from 'react';
import './AddEmployeeForm.css';

function AddEmployeeForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('Development');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!name || !email || !password) {
      alert('Please fill all required fields.');
      return;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    // Create new employee object
    const newEmployee = {
      name,
      email,
      password,
      department
    };
    
    // Call the onSubmit callback
    onSubmit(newEmployee);
    
    // Reset form
    setName('');
    setEmail('');
    setPassword('');
    setDepartment('Development');
  };
  
  return (
    <div className="employee-form-container">
      <form className="employee-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">Full Name *</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter employee's full name"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email *</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter employee's email"
            required
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="department" className="form-label">Department</label>
            <select
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="Development">Development</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Finance">Finance</option>
              <option value="HR">HR</option>
              <option value="Operations">Operations</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password *</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Set temporary password"
              required
            />
          </div>
        </div>
        
        <button type="submit" className="btn-primary submit-btn">
          Add Employee
        </button>
      </form>
    </div>
  );
}

export default AddEmployeeForm; 