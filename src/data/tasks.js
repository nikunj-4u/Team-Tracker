export const tasks = [
  {
    id: 1,
    title: "Develop Landing Page",
    category: "Development",
    priority: "High",
    description: "Create a responsive landing page for the new product launch",
    status: "In Progress",
    assignedTo: [2, 4],
    createdBy: 1,
    createdAt: "2023-08-15T10:00:00Z",
    dueDate: "2023-08-25T18:00:00Z",
    comments: [
      {
        id: 1,
        sender: 1,
        text: "How's the progress on this? Any blockers?",
        timestamp: "2023-08-16T14:30:00Z"
      },
      {
        id: 2,
        sender: 2,
        text: "Working on the responsive design. Should be done by tomorrow.",
        timestamp: "2023-08-16T15:45:00Z"
      }
    ]
  },
  {
    id: 2,
    title: "Design Logo",
    category: "Design",
    priority: "Medium",
    description: "Design a new logo for the company rebrand",
    status: "Completed",
    assignedTo: [3],
    createdBy: 1,
    createdAt: "2023-08-10T09:30:00Z",
    dueDate: "2023-08-20T18:00:00Z",
    comments: [
      {
        id: 1,
        sender: 3,
        text: "I've uploaded three variations for review.",
        timestamp: "2023-08-15T10:20:00Z"
      },
      {
        id: 2,
        sender: 1,
        text: "The second option looks great! Let's go with that.",
        timestamp: "2023-08-15T11:15:00Z"
      }
    ]
  },
  {
    id: 3,
    title: "Fix Navigation Bug",
    category: "Bug Fix",
    priority: "Critical",
    description: "Fix the navigation menu that breaks on mobile devices",
    status: "Pending",
    assignedTo: [2],
    createdBy: 1,
    createdAt: "2023-08-18T14:00:00Z",
    dueDate: "2023-08-21T18:00:00Z",
    comments: []
  },
  {
    id: 4,
    title: "Create Email Campaign",
    category: "Marketing",
    priority: "Medium",
    description: "Create an email campaign for the upcoming product launch",
    status: "In Progress",
    assignedTo: [5],
    createdBy: 1,
    createdAt: "2023-08-16T11:30:00Z",
    dueDate: "2023-08-28T18:00:00Z",
    comments: [
      {
        id: 1,
        sender: 5,
        text: "I'll need the final copy text before Thursday.",
        timestamp: "2023-08-17T09:10:00Z"
      }
    ]
  },
  {
    id: 5,
    title: "Implement Authentication",
    category: "Development",
    priority: "High",
    description: "Implement user authentication flow for the web application",
    status: "In Progress",
    assignedTo: [2, 4],
    createdBy: 1,
    createdAt: "2023-08-14T13:00:00Z",
    dueDate: "2023-08-26T18:00:00Z",
    comments: []
  },
  {
    id: 6,
    title: "Create User Documentation",
    category: "Documentation",
    priority: "Low",
    description: "Write user documentation for the new features",
    status: "Pending",
    assignedTo: [3, 5],
    createdBy: 1,
    createdAt: "2023-08-17T09:00:00Z",
    dueDate: "2023-08-31T18:00:00Z",
    comments: []
  }
]; 