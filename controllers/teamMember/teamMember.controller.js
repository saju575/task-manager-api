// create team member controller

const TeamMember = require("../../models/teamMember.model");
const { successResponse } = require("../response/response.controller");

exports.addTeamMember = async (req, res, next) => {
  try {
    const { name, avatar } = req.body;
    const newTeamMember = new TeamMember({ name, avatar });
    const savedTeamMember = await newTeamMember.save();

    return successResponse(res, { payload: savedTeamMember });
  } catch (error) {
    next(error);
  }
};

// get all team member
exports.getAllTeamMembers = async (req, res, next) => {
  try {
    const teamMembers = await TeamMember.find();
    return successResponse(res, { payload: teamMembers });
  } catch (error) {
    next(error);
  }
};
