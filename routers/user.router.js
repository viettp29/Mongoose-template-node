const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");
const { auth } = require("../middlewares");
const {
  validateUser,
  validateLogin,
} = require("../middlewares/validators/userValidate");
const { handleError } = require("../middlewares/errors/index");
const { ROLES } = require("../utils/constances");
router
  .post("/register", validateUser, handleError(userController.register))
  .post("/login", validateLogin, handleError(userController.login))
  .get(
    "/me",
    auth([ROLES.PRESIDENT, ROLES.LEADER, ROLES.MANAGER, ROLES.STAFF]),
    handleError(userController.getUserById)
  )
  .get(
    "/all-user",
    auth([ROLES.PRESIDENT]),
    handleError(userController.getAllUsers)
  );

module.exports = router;
