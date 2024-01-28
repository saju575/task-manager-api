const mongoose = require("mongoose");
const createHttpError = require("http-errors");
const Task = require("../../models/task.model");
const { successResponse } = require("../response/response.controller");

// create task
exports.createTask = async (req, res, next) => {
  try {
    const { taskName, status, deadline, teamMember, project } = req.body;

    // Validate request body
    if (!taskName || !status || !deadline || !teamMember || !project) {
      throw new Error("All fields are required");
    }

    // Create a new task
    const newTask = new Task({
      taskName,
      status,
      deadline,
      teamMember,
      project,
    });

    // Save the task to the database
    await newTask.save();

    return successResponse(res, { payload: newTask });
  } catch (error) {
    next(error);
  }
};

// get single task
exports.getSingleTask = async (req, res, next) => {
  try {
    const taskId = req.params.taskId;

    // Validate task ID
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      throw createHttpError(400, "Invalid task ID");
    }

    // Retrieve the task by ID, populating the teamMember and project fields
    const task = await Task.findById(taskId)
      .populate("teamMember", "name avatar")
      .populate("project", "projectName colorClass");

    if (!task) {
      throw createHttpError(404, "Task not found");
    }

    return successResponse(res, { payload: task });
  } catch (error) {
    next(error);
  }
};

//get all tasks

exports.getAllTasks = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1; // Get the page number or default to 1
    const perPage = parseInt(req.query.perPage) || 6; // Get the number of items per page or default to 10

    // Calculate the skip value based on the page and perPage
    const skip = (page - 1) * perPage;

    const { taskName, status, projectName } = req.query;

    let projectsNamesArray;
    if (projectName) {
      projectsNamesArray = projectName
        .split(",")
        .map((element) => decodeURIComponent(element));
    }

    const matchConditions = [];

    if (taskName) {
      matchConditions.push({
        $match: { taskName: { $regex: taskName, $options: "i" } },
      });
    }
    if (status) {
      matchConditions.push({ $match: { status } });
    }
    if (projectsNamesArray && projectsNamesArray.length > 0) {
      matchConditions.push({
        $match: { "project.projectName": { $in: projectsNamesArray } },
      });
    }

    const pipeline = [
      {
        $lookup: {
          from: "teammembers",
          localField: "teamMember",
          foreignField: "_id",
          as: "teamMember",
        },
      },
      {
        $lookup: {
          from: "projects",
          localField: "project",
          foreignField: "_id",
          as: "project",
        },
      },

      {
        $project: {
          teamMember: { $arrayElemAt: ["$teamMember", 0] },
          project: { $arrayElemAt: ["$project", 0] },
          _id: 1,
          taskName: 1,
          status: 1,
          deadline: 1,
        },
      },
      ...matchConditions,
    ];

    const countPipeline = [...pipeline, { $count: "count" }];

    const countResult = await Task.aggregate(countPipeline);

    const totalCount = countResult.length > 0 ? countResult[0].count : 0;
    const tasks = await Task.aggregate([
      ...pipeline,
      { $skip: skip },
      { $limit: parseInt(perPage) },
    ]);

    // return successResponse(res, { payload: tasks });

    // return the success response
    return successResponse(res, {
      payload: {
        total: totalCount,
        perPage,
        currentPage: page,
        totalPages: Math.ceil(totalCount / perPage),
        start: skip + 1,
        end: perPage > totalCount ? totalCount : perPage,
        data: tasks,
      },
    });
  } catch (error) {
    next(error);
  }
};

//delete task
exports.deleteTask = async (req, res, next) => {
  try {
    const taskId = req.params.taskId;
    // Validate task ID
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      throw createHttpError(400, "Invalid task ID");
    }

    // Find and delete the task by ID
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      throw createHttpError(404, "Task not found");
    }

    return successResponse(res, {
      message: "Task deleted successfully",
      payload: deletedTask,
    });
  } catch (error) {
    next(error);
  }
};

// update task
exports.updateTask = async (req, res, next) => {
  try {
    const taskId = req.params.taskId;
    const updateFields = req.body;

    // Validate task ID
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      throw createHttpError(400, "Invalid task ID");
    }

    // Find and update the task by ID
    const updatedTask = await Task.findByIdAndUpdate(taskId, updateFields, {
      new: true,
    });

    if (!updatedTask) {
      throw createHttpError(404, "Task not found");
    }

    return successResponse(res, {
      message: "Task updated successfully",
      payload: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};
