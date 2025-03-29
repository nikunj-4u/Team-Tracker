import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, currentUser, isAdmin } = useAuth();
  const navigate = useNavigate();

  // If already logged in, redirect to appropriate dashboard
  useEffect(() => {
    if (currentUser) {
      navigate(isAdmin ? '/admin' : '/employee');
    }
  }, [currentUser, isAdmin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log(`Attempting to login with email: ${email}`);
      const success = login(email, password);
      
      if (success) {
        console.log('Login successful, redirecting to dashboard');
        // The useEffect will handle the redirect based on user role
      } else {
        console.log('Login failed - invalid credentials');
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Failed to log in. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Task Management System</h1>
          <p>Please log in to continue</p>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="demo-credentials">
          <h3>Demo Credentials</h3>
          <div className="credentials-section">
            <div className="credential-group">
              <h4>Admin</h4>
              <p><strong>Email:</strong> admin@example.com</p>
              <p><strong>Password:</strong> admin123</p>
            </div>
            <div className="credential-group">
              <h4>Employee</h4>
              <p><strong>Email:</strong> john@example.com</p>
              <p><strong>Password:</strong> john123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login; 