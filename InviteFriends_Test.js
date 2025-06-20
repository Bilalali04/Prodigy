import InviteFriends from './InviteFriends';

const inviter = new InviteFriends(session, taskManager);

// 4. Invite friend without being logged in
console.log("\nTEST CASE 4: Invite friend without being logged in");
session.logout();
inviter.invite("friend@example.com", "Finish homework");

// 5. Invite friend to non-existent task
console.log("\nTEST CASE 5: Invite friend to a non-existent task");
session.login("Taha");
inviter.invite("friend@example.com", "Nonexistent Task");

// 6. Invite friend to valid task
console.log("\nTEST CASE 6: Invite friend to existing task");
inviter.invite("friend@example.com", "Finish homework");

// 7. Invite multiple friends to the same task
console.log("\nTEST CASE 7: Invite multiple friends to a task");
inviter.invite("another@example.com", "Finish homework");

// 8. List collaborators for a task
console.log("\nTEST CASE 8: List collaborators for a task");
inviter.listCollaborators("Finish homework");

// 9. List collaborators for a task with none
console.log("\nTEST CASE 9: List collaborators for a task with no invites");
inviter.listCollaborators("Do laundry");
