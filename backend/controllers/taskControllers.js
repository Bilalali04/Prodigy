const Task = require("../models/Task");
const { validateObjectId } = require("../utils/validation");

exports.getTasks = async (req, res) => {
  try {
    const userEmail = req.user.email;

    const tasks = await Task.find({
      $or: [
        { user: req.user.id },
        { invitedUsers: userEmail }
      ]
    });

    res.status(200).json({ tasks, status: true, msg: "Tasks found successfully.." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
};

exports.getTask = async (req, res) => {
  try {
    if (!validateObjectId(req.params.taskId)) {
      return res.status(400).json({ status: false, msg: "Task id not valid" });
    }

    const task = await Task.findOne({
      _id: req.params.taskId,
      $or: [
        { user: req.user.id },
        { invitedUsers: req.user.email }
      ]
    });

    if (!task) {
      return res.status(400).json({ status: false, msg: "No task found.." });
    }

    res.status(200).json({ task, status: true, msg: "Task found successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
};

exports.postTask = async (req, res) => {
  try {
    const { name, description, invitedUsers } = req.body;

    if (!description || !name) {
      return res.status(400).json({ status: false, msg: "Name or description of task not found" });
    }

    const task = await Task.create({
      user: req.user.id,
      name,
      description,
      invitedUsers: invitedUsers || []
    });

    res.status(200).json({ task, status: true, msg: "Task created successfully.." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
};


exports.putTask = async (req, res) => {
  try {
    const { name, description } = req.body;
  if (!description || !name) {
    return res.status(400).json({ status: false, msg: "Name or description of task not found" });
  }

    if (!validateObjectId(req.params.taskId)) {
      return res.status(400).json({ status: false, msg: "Task id not valid" });
    }

    let task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(400).json({ status: false, msg: "Task with given id not found" });
    }

    if (task.user != req.user.id) {
      return res.status(403).json({ status: false, msg: "You can't update task of another user" });
    }

    task = await Task.findByIdAndUpdate(req.params.taskId, { name, description }, { new: true });
    res.status(200).json({ task, status: true, msg: "Task updated successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}
exports.inviteUserToTask = async (req, res) => {
  const { taskId } = req.params;
  const { email } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, message: "Invalid email" });
  }

  const task = await Task.findById(taskId);
  if (!task) return res.status(404).json({ success: false, message: "Task not found" });

  if (!task.user.equals(req.user._id)) {
    return res.status(403).json({ success: false, message: "Not authorized" });
  }

  if (!task.invitedUsers.includes(email)) {
    task.invitedUsers.push(email);
    await task.save();
  }

  res.status(200).json({ success: true, message: "User invited" });
};



exports.deleteTask = async (req, res) => {
  try {
    if (!validateObjectId(req.params.taskId)) {
      return res.status(400).json({ status: false, msg: "Task id not valid" });
    }

    let task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(400).json({ status: false, msg: "Task with given id not found" });
    }

    if (task.user != req.user.id) {
      return res.status(403).json({ status: false, msg: "You can't delete task of another user" });
    }

    await Task.findByIdAndDelete(req.params.taskId);
    res.status(200).json({ status: true, msg: "Task deleted successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}