# Employee Management System (EMS)

A responsive task management system built with React for managing employees, tasks, and team communication.

## Features

- **User Authentication**: Separate login for admin and employee roles
- **Task Management**: Create, assign, and track tasks with priority and status
- **Employee Management**: Add and manage employee profiles
- **Team Communication**: Real-time messaging system for team collaboration
- **Task Comments**: Thread-based commenting system for each task
- **Dark Mode**: Fully customizable light/dark theme system
- **Responsive Design**: Mobile-friendly interface that works on all devices

## User Persistence

When new users are added to the system, they are stored in localStorage, allowing them to log in during the current browser session. However, to make users persist between sessions and browser refreshes, you need to add them to the `src/data/users.js` file.

### How to Add Users to `users.js`

1. As an admin, add a new employee through the "Add Employee" tab
2. Navigate to the "Employees" tab, where you'll see a "Newly Added Users" section 
3. Click "Show Code" to view the formatted code for the new users
4. Copy the code and manually add it to `src/data/users.js`

This ensures that new users will be able to log in even after a page refresh or when accessing from another browser/device.

## Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```

## Default Login Credentials

### Admin
- Email: admin@example.com
- Password: admin123

### Employee
- Email: john@example.com
- Password: john123

## Technical Details

- Built with React and modern JavaScript (ES6+)
- Uses localStorage for data persistence
- State management with React Context API
- CSS with custom variables for theming
- Responsive design with CSS Grid and Flexbox

## License

MIT
