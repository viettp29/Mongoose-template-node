const userService = require("../services/user");
const register = async (req, res) => {
  const user = await userService.register(req.body);
  const { password, ...args } = user._doc;
  return res.json({ status: "sucessfully", user: args });
};

const login = async (req, res) => {
  const token = await userService.login(req.body);
  return res.status(200).json({ token: token });
};

const getUserById = async (req, res) => {
  const userId = res.locals.user;
  const user = await userService.getUserById(userId);
  return res.json(user);
};

const getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  return res.status(200).json({ count: users.length, users: users });
};

module.exports = { register, login, getUserById, getAllUsers };
