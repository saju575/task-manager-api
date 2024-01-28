const express = require("express");
const cors = require("cors");
const createHttpError = require("http-errors");
const { errorResponse } = require("./controllers/response/response.controller");
const projectsName = require("./routes/projectsName.route");
const teamMemberRouter = require("./routes/teamMember.route");
const taskRouter = require("./routes/task.route");

/* 
    making express app
*/
const app = express();

/* 
    default middlewares
*/
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* 
  projectsName endpoints
*/
app.use("/api/v1/projectsName", projectsName);

/* team member endpoints */
app.use("/api/v1/teamMember", teamMemberRouter);

/* task endpoints */
app.use("/api/v1/task", taskRouter);

/*
    Client error handler
 */
app.use((req, res, next) => {
  next(createHttpError(404, "Route Not Found"));
});

/*
          Server error handler
          -> all the error comes here
      */
app.use((err, req, res, next) => {
  return errorResponse(res, { statusCode: err.status, message: err.message });
});

/* 
          exporting express app
      */
module.exports = app;
