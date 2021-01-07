const express = require("express");
const server = express();
const mongoose = require("mongoose");
const error_handler = require("node-error-handler");
const cors = require("cors");
const examRoutes = require("./services/exams");
const questionRoutes = require("./services/questions");
const usersRoutes = require("./services/users");

//connect to db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to database"));

//middlewares
server.use(express.json());
server.use(cors());

//routes
server.use("/exams", examRoutes);
server.use("/questions", questionRoutes);
server.use("/users", usersRoutes);
//error handler
server.use(error_handler({ log: true, debug: true }));

//connect to the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log("connected to port " + PORT));
