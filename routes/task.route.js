const express = require("express");
const {
  createTask,
  getSingleTask,
  getAllTasks,
  deleteTask,
  updateTask,
} = require("../controllers/task/task.controller");

const taskRouter = express.Router();

// create end point
taskRouter.post("/create", createTask);

//get single task
taskRouter.get("/:taskId", getSingleTask);

// get all tasks
taskRouter.get("/", getAllTasks);

//delete
taskRouter.delete("/:taskId", deleteTask);

// update task
taskRouter.put("/:taskId", updateTask);

module.exports = taskRouter;
