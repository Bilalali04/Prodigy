import Logout from './Logout.js';
import Session from './Session.js';

function runTest(description, testFunction) {
  try {
    testFunction();
    console.log(`${description} - passed`);
  } catch (error) {
    console.error(`${description} - failed`);
    console.error(error.message);
  }
}

// Test 1: Logout with a user logged in
runTest('should log out the current user', () => {
  const session = new Session();
  session.setUser({ name: 'admin' });
  const logout = new Logout(session);

  logout.logout();

  if (session.getUser() !== null) {
    throw new Error('Expected session to be cleared after logout');
  }
});

// Test 2: Logout with no user logged in
runTest('should handle logout when no user is logged in', () => {
  const session = new Session();
  const logout = new Logout(session);

  logout.logout();

  if (session.getUser() !== null) {
    throw new Error('Expected no change when no user is logged in');
  }
});
