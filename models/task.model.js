const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    deadline: {
      type: String,
      required: true,
    },
    teamMember: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TeamMember",
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
  },
  { versionKey: false }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
