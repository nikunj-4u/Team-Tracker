import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './DarkModeToggle.css';

function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="dark-mode-toggle">
      <input
        type="checkbox"
        id="darkmode-toggle"
        checked={darkMode}
        onChange={toggleDarkMode}
      />
      <label htmlFor="darkmode-toggle">
        <div className="toggle-track">
          <div className="toggle-indicator">
            <div className="indicator-icons">
              <span className="moon">🌙</span>
              <span className="sun">☀️</span>
            </div>
          </div>
        </div>
      </label>
      <span className="dark-mode-label">{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
    </div>
  );
}

export default DarkModeToggle; 