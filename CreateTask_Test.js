import CreateTask from './CreateTask';

const session = new MockSession();
const taskManager = new CreateTask(session);

// 1. Create task without login
console.log("TEST CASE 1: Create task without being logged in");
taskManager.addTask("Buy groceries", "2025-04-01");

// 2. Create task after login
console.log("\nTEST CASE 2: Create task after login");
session.login("Taha");
taskManager.addTask("Finish homework", "2025-04-05");
taskManager.addTask("Do laundry"); // No due date

// 3. List all tasks
console.log("\nTEST CASE 3: List all created tasks");
taskManager.listTasks();
