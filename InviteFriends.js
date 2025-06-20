class InviteFriends {
    constructor(session, taskManager) {
        this.session = session;
        this.taskManager = taskManager;
    }

    invite(email, taskName) {
        const user = this.session.getUser();
        if (!user) {
            console.log("You must be logged in to invite friends.");
            return;
        }

        const task = this.taskManager.tasks.find(task => task.name === taskName);
        if (!task) {
            console.log(`Task '${taskName}' not found.`);
            return;
        }

        if (!task.collaborators) {
            task.collaborators = [];
        }

        task.collaborators.push(email);
        console.log(`${user.name} invited ${email} to collaborate on '${taskName}'.`);
    }

    listCollaborators(taskName) {
        const task = this.taskManager.tasks.find(task => task.name === taskName);
        if (!task) {
            console.log(`Task '${taskName}' not found.`);
            return;
        }

        if (!task.collaborators || task.collaborators.length === 0) {
            console.log(`No collaborators for '${taskName}'.`);
        } else {
            console.log(`Collaborators for '${taskName}': ${task.collaborators.join(", ")}`);
        }
    }
}

export default InviteFriends;
