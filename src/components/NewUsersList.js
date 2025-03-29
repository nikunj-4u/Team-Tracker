import React, { useState, useEffect } from 'react';
import { getNewUsers } from '../services/DataService';
import './NewUsersList.css';

function NewUsersList() {
  const [newUsers, setNewUsers] = useState([]);

  useEffect(() => {
    setNewUsers(getNewUsers());
  }, []);

  if (newUsers.length === 0) {
    return null;
  }

  return (
    <div className="new-users-list">
      <div className="new-users-header">
        <h3>Newly Added Users</h3>
        <p>These users exist in localStorage and will be available until you refresh the page.</p>
        <p>For permanent storage, add them to <code>src/data/users.js</code> file directly in your code editor.</p>
      </div>
      
      <div className="new-users-table">
        <div className="new-users-table-header">
          <div className="header-cell">ID</div>
          <div className="header-cell">Name</div>
          <div className="header-cell">Email</div>
          <div className="header-cell">Role</div>
          <div className="header-cell">Department</div>
        </div>
        
        {newUsers.map(user => (
          <div key={user.id} className="new-users-table-row">
            <div className="table-cell">{user.id}</div>
            <div className="table-cell">{user.name}</div>
            <div className="table-cell">{user.email}</div>
            <div className="table-cell">{user.role}</div>
            <div className="table-cell">{user.department || 'General'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewUsersList; 