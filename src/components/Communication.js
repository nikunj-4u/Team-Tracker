import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { getMessages, addMessage, getUserById } from '../services/DataService';
import './Communication.css';

function Communication() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { currentUser } = useAuth();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Load messages from data service
    setMessages(getMessages());
    scrollToBottom();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Add message to data service
    const message = addMessage(currentUser.id, newMessage);
    
    // Update local state
    setMessages([...messages, message]);
    setNewMessage('');
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString([], { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getSenderName = (senderId) => {
    const user = getUserById(senderId);
    return user ? user.name : 'Unknown User';
  };

  const isCurrentUser = (senderId) => {
    return currentUser && currentUser.id === senderId;
  };

  // Group messages by date
  const groupedMessages = messages.reduce((groups, message) => {
    const date = new Date(message.timestamp).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});

  return (
    <div className="communication-container">
      <div className="communication-header">
        <h2>Team Chat</h2>
        <div className="online-indicator">
          <span className="online-dot"></span>
          <span>Team Channel</span>
        </div>
      </div>
      
      <div className="messages-container">
        {Object.keys(groupedMessages).length === 0 ? (
          <div className="no-messages">
            <p>No messages yet. Start a conversation!</p>
          </div>
        ) : (
          Object.keys(groupedMessages).map(date => (
            <div key={date} className="message-date-group">
              <div className="date-divider">
                <span>{formatDate(new Date(date))}</span>
              </div>
              
              {groupedMessages[date].map(message => (
                <div 
                  key={message.id} 
                  className={`message ${isCurrentUser(message.sender) ? 'message-own' : ''}`}
                >
                  {!isCurrentUser(message.sender) && (
                    <div className="message-sender">{getSenderName(message.sender)}</div>
                  )}
                  <div className="message-bubble">
                    <div className="message-text">{message.text}</div>
                    <div className="message-time">{formatTime(message.timestamp)}</div>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form className="message-input-container" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Type your message here..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="message-input"
        />
        <button type="submit" className="btn-primary send-button">
          <span>Send</span>
        </button>
      </form>
    </div>
  );
}

export default Communication; 