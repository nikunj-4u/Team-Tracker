import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getTaskComments, addTaskComment, getUserById } from '../services/DataService';
import './TaskItem.css';

function TaskItem({ task, isAdmin, employees, onStatusChange }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [status, setStatus] = useState(task.status);
  const [isFlipped, setIsFlipped] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    // Load comments from data service
    setComments(getTaskComments(task.id));
  }, [task.id]);

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'Critical': return 'priority-critical';
      case 'High': return 'priority-high';
      case 'Medium': return 'priority-medium';
      case 'Low': return 'priority-low';
      default: return '';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Completed': return 'status-completed';
      case 'In Progress': return 'status-progress';
      case 'Pending': return 'status-pending';
      default: return '';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getAssignedEmployees = () => {
    if (!task.assignedTo || !task.assignedTo.length) return 'Unassigned';
    
    const assignedUsers = task.assignedTo.map(userId => {
      const user = getUserById(userId);
      return user ? user.name : 'Unknown';
    });
    
    return assignedUsers.join(', ');
  };

  const handleStatusChange = (e) => {
    e.stopPropagation();
    const newStatus = e.target.value;
    setStatus(newStatus);
    
    // Call the parent component's handler if provided
    if (onStatusChange) {
      onStatusChange(task.id, newStatus);
    }
  };

  const toggleFlip = (e) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSendComment = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!newComment.trim()) return;
    
    // Add comment to data service
    const comment = addTaskComment(task.id, currentUser.id, newComment);
    
    if (comment) {
      // Update local state
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  return (
    <div 
      className={`task-item ${isExpanded ? 'expanded' : ''} ${isFlipped ? 'flipped' : ''}`}
      onClick={toggleExpand}
    >
      <div className="task-item-inner">
        <div className="task-item-front">
          <div className="task-header">
            <div className="task-title">
              <h3>{task.title}</h3>
              <div className="task-badges">
                <span className={`task-priority ${getPriorityClass(task.priority)}`}>
                  {task.priority}
                </span>
                <span className={`task-status ${getStatusClass(status)}`}>
                  {status}
                </span>
              </div>
            </div>
            <div className="task-meta">
              <span className="task-category">{task.category}</span>
              <span className="task-due-date">Due: {formatDate(task.dueDate)}</span>
            </div>
          </div>
          
          <div className={`task-details ${isExpanded ? 'visible' : ''}`}>
            <div className="task-description">
              <h4>Description</h4>
              <p>{task.description}</p>
            </div>
            
            <div className="task-info">
              <div className="task-info-item">
                <span className="label">Assigned to:</span>
                <span className="value">{getAssignedEmployees()}</span>
              </div>
              <div className="task-info-item">
                <span className="label">Created on:</span>
                <span className="value">{formatDate(task.createdAt)}</span>
              </div>
              <div className="task-info-item">
                <span className="label">Due date:</span>
                <span className="value">{formatDate(task.dueDate)}</span>
              </div>
              {!isAdmin && (
                <div className="task-info-item">
                  <span className="label">Update Status:</span>
                  <select 
                    value={status} 
                    onChange={handleStatusChange}
                    className="status-dropdown"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              )}
            </div>
            
            <div className="task-actions">
              <button className="btn-flip" onClick={toggleFlip}>
                <span className="flip-icon">↻</span> View Comments {comments.length > 0 && `(${comments.length})`}
              </button>
            </div>
          </div>
        </div>
        
        <div className="task-item-back">
          <div className="task-comments-header">
            <h3>Comments & Discussion</h3>
            <button className="btn-flip" onClick={toggleFlip}>
              <span className="flip-icon">↻</span> Back to Task
            </button>
          </div>
          <div className="task-comments-section">
            <div className="comments-container">
              {comments.length === 0 ? (
                <p className="no-comments">No comments yet. Start a conversation!</p>
              ) : (
                <div className="comments-list">
                  {comments.map(comment => {
                    const sender = getUserById(comment.sender);
                    const isCurrentUserComment = currentUser && comment.sender === currentUser.id;
                    
                    return (
                      <div 
                        key={comment.id} 
                        className={`comment ${isCurrentUserComment ? 'comment-own' : ''}`}
                      >
                        <div className="comment-header">
                          <span className="comment-sender">{sender?.name || 'Unknown User'}</span>
                          <span className="comment-time">{formatTime(comment.timestamp)}</span>
                        </div>
                        <div className="comment-body">
                          {comment.text}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <form className="comment-form" onSubmit={handleSendComment}>
              <textarea 
                placeholder="Type your message here..." 
                className="comment-input"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              ></textarea>
              <button 
                type="submit" 
                className="btn-primary send-comment-btn"
                onClick={(e) => e.stopPropagation()}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskItem; 