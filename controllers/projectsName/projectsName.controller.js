const ProjectsName = require("../../models/projectsName.model");
const { successResponse } = require("../response/response.controller");

// create projectsName controller
exports.addProjectsName = async (req, res, next) => {
  try {
    const { projectName, colorClass } = req.body;
    const newProject = new ProjectsName({ projectName, colorClass });
    const savedProject = await newProject.save();

    return successResponse(res, { payload: savedProject });
  } catch (error) {
    next(error);
  }
};

/* get all projectsName controller */
exports.getAllProjectsName = async (req, res, next) => {
  try {
    const projects = await ProjectsName.find();

    return successResponse(res, { payload: projects });
  } catch (error) {
    next(error);
  }
};
