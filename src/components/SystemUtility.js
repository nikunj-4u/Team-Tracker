import React, { useState } from 'react';
import { getAllData } from '../services/DataService';
import './SystemUtility.css';

function SystemUtility() {
  const [exportType, setExportType] = useState('all');
  
  // Function to generate file content for users.js
  const generateUsersFile = (data) => {
    return `// Updated users.js file - ${new Date().toLocaleString()}
export const users = ${JSON.stringify(data.users, null, 2)};
`;
  };
  
  // Function to generate file content for tasks.js
  const generateTasksFile = (data) => {
    return `// Updated tasks.js file - ${new Date().toLocaleString()}
export const tasks = ${JSON.stringify(data.tasks, null, 2)};
`;
  };
  
  // Function to download a file
  const downloadFile = (content, filename) => {
    const blob = new Blob([content], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
  };
  
  // Handler for export button
  const handleExport = () => {
    const allData = getAllData();
    
    if (exportType === 'all' || exportType === 'users') {
      const usersContent = generateUsersFile(allData);
      downloadFile(usersContent, 'users.js');
    }
    
    if (exportType === 'all' || exportType === 'tasks') {
      const tasksContent = generateTasksFile(allData);
      downloadFile(tasksContent, 'tasks.js');
    }
    
    if (exportType === 'all') {
      alert('All data files have been downloaded. Replace the files in your src/data directory to update your application.');
    } else {
      alert(`${exportType}.js file has been downloaded. Replace the file in your src/data directory to update your application.`);
    }
  };
  
  // Handler for export button with tutorial
  const handleExportWithTutorial = () => {
    handleExport();
    
    // Show detailed instructions
    const instructions = `
1. Look for the downloaded file(s) in your downloads folder
2. Copy the file(s) to your project's src/data directory, replacing the existing files
3. Restart your application to see the changes
    `;
    
    alert(instructions);
  };
  
  return (
    <div className="system-utility">
      <h3>System Utilities</h3>
      <p>Export and update your application data</p>
      
      <div className="export-section">
        <h4>Export Data to Files</h4>
        <p>Generate JavaScript files to update your application's backend data</p>
        
        <div className="export-options">
          <div className="radio-group">
            <label>
              <input 
                type="radio" 
                name="exportType" 
                value="all" 
                checked={exportType === 'all'} 
                onChange={() => setExportType('all')} 
              />
              All Data (users.js & tasks.js)
            </label>
          </div>
          
          <div className="radio-group">
            <label>
              <input 
                type="radio" 
                name="exportType" 
                value="users" 
                checked={exportType === 'users'} 
                onChange={() => setExportType('users')} 
              />
              Users Only (users.js)
            </label>
          </div>
          
          <div className="radio-group">
            <label>
              <input 
                type="radio" 
                name="exportType" 
                value="tasks" 
                checked={exportType === 'tasks'} 
                onChange={() => setExportType('tasks')} 
              />
              Tasks Only (tasks.js)
            </label>
          </div>
        </div>
        
        <div className="export-buttons">
          <button className="btn-export" onClick={handleExport}>
            Export Data
          </button>
          <button className="btn-export-tutorial" onClick={handleExportWithTutorial}>
            Export Data + Tutorial
          </button>
        </div>
      </div>
      
      <div className="instructions-section">
        <h4>How to Update Backend Files</h4>
        <ol>
          <li>Click the "Export Data" button above</li>
          <li>The files will be downloaded to your computer</li>
          <li>Replace the existing files in <code>src/data/</code> directory</li>
          <li>Restart your application</li>
        </ol>
        <p className="note">
          <strong>Note:</strong> This process is necessary because browser security restrictions prevent 
          JavaScript from directly modifying files on your computer.
        </p>
      </div>
    </div>
  );
}

export default SystemUtility; 