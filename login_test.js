import Login from './Login.js';
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

// Test 1: Valid credentials (username)
runTest('should log in with valid username', () => {
  const session = new Session();
  const login = new Login(session);
  const result = login.login('admin', 'adminpass123');
  if (!result || session.user.name !== 'admin') {
    throw new Error('Expected successful login and user to be set');
  }
});

// Test 2: Valid credentials (email)
runTest('should log in with valid email', () => {
  const session = new Session();
  const login = new Login(session);
  const result = login.login('admin@example.com', 'adminpass123');
  if (!result || session.user.name !== 'admin') {
    throw new Error('Expected successful login using email');
  }
});

// Test 3: Invalid username
runTest('should fail login with invalid username', () => {
  const session = new Session();
  const login = new Login(session);
  const result = login.login('wrongUser', 'adminpass123');
  if (result || session.user !== null) {
    throw new Error('Expected login to fail with invalid username');
  }
});

// Test 4: Invalid password
runTest('should fail login with invalid password', () => {
  const session = new Session();
  const login = new Login(session);
  const result = login.login('admin', 'wrongpass');
  if (result || session.user !== null) {
    throw new Error('Expected login to fail with invalid password');
  }
});

// Test 5: Invalid username and password
runTest('should fail login with both username and password invalid', () => {
  const session = new Session();
  const login = new Login(session);
  const result = login.login('baduser', 'badpass');
  if (result || session.user !== null) {
    throw new Error('Expected login to fail with bad credentials');
  }
});
