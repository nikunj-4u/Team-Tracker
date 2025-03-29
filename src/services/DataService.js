import { users as initialUsers } from '../data/users';
import { tasks as initialTasks } from '../data/tasks';

// Initialize data from localStorage or use initial data if not exists
const initializeData = () => {
  // Load users
  let users = localStorage.getItem('ems_users');
  if (!users) {
    users = initialUsers;
    localStorage.setItem('ems_users', JSON.stringify(users));
  } else {
    users = JSON.parse(users);
  }
  
  // Load tasks
  let tasks = localStorage.getItem('ems_tasks');
  if (!tasks) {
    tasks = initialTasks;
    localStorage.setItem('ems_tasks', JSON.stringify(tasks));
  } else {
    tasks = JSON.parse(tasks);
  }
  
  // Load messages
  let messages = localStorage.getItem('ems_messages');
  if (!messages) {
    messages = [];
    localStorage.setItem('ems_messages', JSON.stringify(messages));
  } else {
    messages = JSON.parse(messages);
  }
  
  return { users, tasks, messages };
};

// Initialize data
let { users, tasks, messages } = initializeData();

// Helper to notify about the need to update users.js file manually
const updateUsersFile = () => {
  // Browser environment - we can't directly update files
  console.log('In a browser environment, cannot directly update users.js file.');
  console.log('To permanently add users, you would need to:', 
    '\n1. Add them to src/data/users.js manually, or', 
    '\n2. Set up a backend API to handle user management.');
  
  return true;
};

// User related operations
export const getUsers = () => {
  return [...users];
};

export const getEmployees = () => {
  return users.filter(user => user.role === 'employee');
};

export const getUserById = (userId) => {
  return users.find(user => user.id === userId);
};

export const addUser = (newUser) => {
  const maxId = Math.max(...users.map(u => u.id), 0);
  const user = {
    id: maxId + 1,
    ...newUser
  };
  
  users = [...users, user];
  localStorage.setItem('ems_users', JSON.stringify(users));
  
  // Notify about manual update needed
  updateUsersFile();
  
  // Create a special localStorage item to indicate this user should be added to users.js
  const newUsers = JSON.parse(localStorage.getItem('ems_new_users') || '[]');
  newUsers.push(user);
  localStorage.setItem('ems_new_users', JSON.stringify(newUsers));
  
  return user;
};

export const updateUser = (userId, userData) => {
  users = users.map(user => 
    user.id === userId ? { ...user, ...userData } : user
  );
  localStorage.setItem('ems_users', JSON.stringify(users));
  
  // Notify about manual update needed
  updateUsersFile();
  
  return users.find(user => user.id === userId);
};

// Login function that works with both stored and initial users
export const loginUser = (email, password) => {
  // First check localStorage users
  const storedUsers = JSON.parse(localStorage.getItem('ems_users') || '[]');
  const user = storedUsers.find(u => u.email === email && u.password === password);
  
  if (user) {
    console.log('User found in localStorage:', user);
    return { ...user };
  }
  
  // If not found in localStorage, check initial users
  const initialUser = initialUsers.find(u => u.email === email && u.password === password);
  if (initialUser) {
    console.log('User found in initialUsers:', initialUser);
    return { ...initialUser };
  }
  
  console.log('No user found with email:', email);
  // No user found
  return null;
};

// Task related operations
export const getTasks = () => {
  return [...tasks];
};

export const getTaskById = (taskId) => {
  return tasks.find(task => task.id === taskId);
};

export const getTasksByEmployeeId = (employeeId) => {
  console.log('Getting tasks for employee:', employeeId);
  console.log('Available tasks:', tasks);
  
  // Convert employeeId to number if it's a string
  const empId = typeof employeeId === 'string' ? parseInt(employeeId, 10) : employeeId;
  
  // Filter tasks that include this employee in assignedTo
  const filteredTasks = tasks.filter(task => {
    // Handle case where assignedTo might be a single ID or an array of IDs
    if (Array.isArray(task.assignedTo)) {
      return task.assignedTo.includes(empId);
    } else {
      return task.assignedTo === empId;
    }
  });
  
  console.log('Filtered tasks:', filteredTasks);
  return filteredTasks;
};

export const addTask = (newTask) => {
  const maxId = Math.max(...tasks.map(t => t.id), 0);
  const task = {
    id: maxId + 1,
    ...newTask,
    comments: []
  };
  
  tasks = [...tasks, task];
  localStorage.setItem('ems_tasks', JSON.stringify(tasks));
  return task;
};

export const updateTask = (taskId, taskData) => {
  tasks = tasks.map(task => 
    task.id === taskId ? { ...task, ...taskData } : task
  );
  localStorage.setItem('ems_tasks', JSON.stringify(tasks));
  return tasks.find(task => task.id === taskId);
};

export const updateTaskStatus = (taskId, status) => {
  return updateTask(taskId, { status });
};

// Task comments operations
export const getTaskComments = (taskId) => {
  const task = getTaskById(taskId);
  return task ? [...(task.comments || [])] : [];
};

export const addTaskComment = (taskId, senderId, text) => {
  const task = getTaskById(taskId);
  if (!task) return null;
  
  // Ensure task has comments array
  if (!task.comments) {
    task.comments = [];
  }
  
  const commentId = task.comments.length > 0 
    ? Math.max(...task.comments.map(c => c.id)) + 1 
    : 1;
  
  const comment = {
    id: commentId,
    sender: senderId,
    text,
    timestamp: new Date().toISOString()
  };
  
  // Add comment to task
  const updatedComments = [...task.comments, comment];
  updateTask(taskId, { comments: updatedComments });
  
  return comment;
};

// Message related operations
export const getMessages = () => {
  return [...messages];
};

export const addMessage = (senderId, text) => {
  const message = {
    id: messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 1,
    sender: senderId,
    text,
    timestamp: new Date().toISOString()
  };
  
  messages = [...messages, message];
  localStorage.setItem('ems_messages', JSON.stringify(messages));
  return message;
};

// Get newly added users that need to be added to users.js
export const getNewUsers = () => {
  return JSON.parse(localStorage.getItem('ems_new_users') || '[]');
};

// Get all data for backup
export const getAllData = () => {
  return {
    users: getUsers(),
    tasks: tasks,
    messages: messages
  };
};

// Reset data (for testing)
export const resetData = () => {
  localStorage.removeItem('ems_users');
  localStorage.removeItem('ems_tasks');
  localStorage.removeItem('ems_messages');
  localStorage.removeItem('ems_new_users');
  
  users = initialUsers;
  tasks = initialTasks;
  messages = [];
  
  localStorage.setItem('ems_users', JSON.stringify(users));
  localStorage.setItem('ems_tasks', JSON.stringify(tasks));
  localStorage.setItem('ems_messages', JSON.stringify(messages));
}; 