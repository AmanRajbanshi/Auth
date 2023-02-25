const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const logger = require("morgan");
const mongoose = require("mongoose");
const { createSeedAdmin } = require("./common/generalHelpers");
require("express-async-handler");
require("dotenv").config();

// Global Middlewares
app.use(express.json());
app.use(logger("dev"));
createSeedAdmin();

//Routes Imports
const userRoute = require("./routes/user");
const eventRoute = require("./routes/event");
const eventLikesRoute = require("./routes/eventLike");
const errorHandler = require("./middlewares/error");

//Routes Middlewares
app.use("/api/v1/users", userRoute);
app.use("/api/v1/events", eventRoute);
app.use("/api/v1/like-event", eventLikesRoute);

app.use(errorHandler);

// mongoose.set("strictQuery", false);
mongoose.connect(
  process.env.DB_CONNECTION,

  (err) => {
    try {
      console.log("connected to db");
    } catch (err) {
      console.log(err.message);
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
