const express = require("express");
const app = express();
require("dotenv").config();
const { handleErrors } = require("./middlewares/errors/index");
const { errors } = require("celebrate");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//import routers
const users = require("./routers/user.router");
const employees = require("./routers/employee.router");
const customers = require("./routers/customer.router");
const logs = require("./routers/log.router");
app.use("/api/users", users);
app.use("/api/employees", employees);
app.use("/api/customers", customers);
app.use("/api/logs", logs);

app.get("/", (req, res) => {
  res.send("hello các bạn mình là Việt đây");
});
app.all("*", function (req, res) {
  return res.status(404).json("Not Found");
});
// error validation
app.use(errors());
//   router chính
app.use(handleErrors);
module.exports = app;
