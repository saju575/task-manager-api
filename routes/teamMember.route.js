const express = require("express");
const {
  addTeamMember,
  getAllTeamMembers,
} = require("../controllers/teamMember/teamMember.controller");

const teamMemberRouter = express.Router();

// create teamMember
teamMemberRouter.post("/create", addTeamMember);

// get all teamMember
teamMemberRouter.get("/", getAllTeamMembers);

module.exports = teamMemberRouter;
