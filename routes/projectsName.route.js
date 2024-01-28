const express = require("express");
const {
  addProjectsName,
  getAllProjectsName,
} = require("../controllers/projectsName/projectsName.controller");

const projectsName = express.Router();

//get all projectsName
projectsName.get("/", getAllProjectsName);

//create projectsName
projectsName.post("/create", addProjectsName);

module.exports = projectsName;
