const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  name: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true,
  },
  invitedUsers: {
    type: [String],
    default: []
  }
  
}, {
  timestamps: true
});


const Task = mongoose.model("Task", taskSchema);
module.exports = Task;