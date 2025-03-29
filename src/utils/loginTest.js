import { loginUser } from '../services/DataService';

// Simple test function to check login
export const testLogin = () => {
  // Test with valid admin credentials
  const adminResult = loginUser('admin@example.com', 'admin123');
  console.log('Admin login test result:', adminResult ? 'Success' : 'Failed');
  
  // Test with valid employee credentials
  const employeeResult = loginUser('john@example.com', 'john123');
  console.log('Employee login test result:', employeeResult ? 'Success' : 'Failed');
  
  // Test with invalid credentials
  const invalidResult = loginUser('invalid@example.com', 'wrongpassword');
  console.log('Invalid login test result:', invalidResult ? 'Unexpected Success' : 'Failed as expected');
  
  return {
    adminTest: !!adminResult,
    employeeTest: !!employeeResult,
    invalidTest: !invalidResult,
    allPassed: !!adminResult && !!employeeResult && !invalidResult,
  };
};

// Test the localStorage user storage
export const testLocalStorageUser = () => {
  // Setup local storage with a test user
  const testUser = {
    id: 999,
    name: 'Test User',
    email: 'test@example.com',
    password: 'test123',
    role: 'employee'
  };
  
  // Get current users from localStorage
  let currentUsers = JSON.parse(localStorage.getItem('ems_users') || '[]');
  
  // Add test user if not already present
  if (!currentUsers.some(u => u.email === testUser.email)) {
    currentUsers.push(testUser);
    localStorage.setItem('ems_users', JSON.stringify(currentUsers));
    console.log('Added test user to localStorage');
  }
  
  // Try to log in with the test user
  const result = loginUser('test@example.com', 'test123');
  console.log('LocalStorage user login test:', result ? 'Success' : 'Failed');
  
  return !!result;
};

// Function to run all tests
export const runAllLoginTests = () => {
  console.log('=== RUNNING LOGIN FUNCTIONALITY TESTS ===');
  
  const loginTests = testLogin();
  const localStorageTest = testLocalStorageUser();
  
  console.log('Login tests summary:');
  console.log('- Admin login:', loginTests.adminTest ? 'PASSED' : 'FAILED');
  console.log('- Employee login:', loginTests.employeeTest ? 'PASSED' : 'FAILED');
  console.log('- Invalid login:', loginTests.invalidTest ? 'PASSED' : 'FAILED');
  console.log('- localStorage user login:', localStorageTest ? 'PASSED' : 'FAILED');
  
  const allTestsPassed = loginTests.allPassed && localStorageTest;
  console.log('Overall test result:', allTestsPassed ? 'ALL TESTS PASSED' : 'SOME TESTS FAILED');
  
  return allTestsPassed;
}; 