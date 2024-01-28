const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
    },
    colorClass: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const ProjectsName = mongoose.model("Project", projectSchema);

module.exports = ProjectsName;
