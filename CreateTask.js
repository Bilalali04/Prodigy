class CreateTask {
    constructor(session) {
        this.session = session;
        this.tasks = [];
    }

    addTask(taskName, dueDate) {
        const user = this.session.getUser();
        if (!user) {
            console.log("You must be logged in to create a task.");
            return;
        }

        const task = {
            name: taskName,
            dueDate: dueDate || "No due date",
            createdBy: user.name,
            collaborators: []
        };

        this.tasks.push(task);
        console.log(`Task '${taskName}' added by ${user.name}.`);
    }

    listTasks() {
        if (this.tasks.length === 0) {
            console.log("No tasks available.");
        } else {
            console.log("Tasks:");
            this.tasks.forEach((task, index) => {
                console.log(`${index + 1}. ${task.name} (Due: ${task.dueDate}) - Created by: ${task.createdBy}`);
            });
        }
    }
}

export default CreateTask;
