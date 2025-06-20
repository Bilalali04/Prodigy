function isValidTaskName(taskName) {
    return typeof taskName === 'string' && taskName.trim().length > 0;
}

function isValidTaskDescription(description) {
    return typeof description === 'string' && description.trim().length > 0 && description.length <= 255;
}

function isValidEmail(email) {
    return typeof email === 'string' && /^[\w.-]+@[\w-]+\.[a-z]{2,6}$/.test(email);
}

function editTask(taskName, description, friendEmail) {
    return isValidTaskName(taskName) && isValidTaskDescription(description) && isValidEmail(friendEmail);
}

module.exports = { editTask };
