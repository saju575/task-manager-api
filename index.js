const app = require("./app");
const connectDB = require("./config/db.config");
const { SERVER_PORT } = require("./secret");

/* 
    listen on port number
*/
app.listen(SERVER_PORT, async () => {
  console.log(`listening on port ${SERVER_PORT}`);

  // calling mongodb connection

  await connectDB();
});
