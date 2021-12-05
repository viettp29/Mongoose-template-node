const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { AppError } = require("../middlewares/errors/index");

const generateToken = async (user) => {
  const { employee, username } = user;
  const { employeeNumber, jobTitle, officeCode } = employee;
  const payload = {
    username,
    employeeNumber,
    jobTitle,
    officeCode,
    iat: moment().unix(),
    expiresIn: 60 * 60,
  };
  const secret = process.env.SECRET_KEY;
  return jwt.sign(payload, secret);
};
const register = async (body) => {
  const { username, password, employeeNumber } = body;
  const user = await User.findOne({ $or: [{ username }, { employeeNumber }] });
  if (!user) {
    const SALT = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, SALT);
    const newUser = await new User({
      username,
      password: passwordHash,
      employeeNumber,
    }).save();
    return newUser;
  }
  throw new AppError("Username does exist", 400);
};

const login = async (body) => {
  const { username, password } = body;
  const myUser = await User.findOne({ username });
  if (myUser) {
    const user = await User.aggregate([
      { $match: { username } },
      {
        $lookup: {
          from: "employees",
          localField: "employeeNumber",
          foreignField: "employeeNumber",
          as: "employee",
        },
      },
      { $unwind: "$employee" },
      {
        $project: {
          _id: 0,
          username: 1,
          password: 1,
          employee: {
            employeeNumber: 1,
            officeCode: 1,
            jobTitle: 1,
          },
        },
      },
    ]);
    const verify = await bcrypt.compare(password, user[0].password);
    if (verify) {
      const token = await generateToken(user[0]);
      return token;
    }
    throw new AppError("username $ password incorrect", 400);
  }
  throw new AppError("Username or Password is incorrect", 400);
};

const getUserByUsername = async (username) => {
  const user = await User.findOne({ username });
  return user;
};

const getUserById = async (userId) => {
  const user = await User.findOne({ _id: userId });
  if (!user) throw new AppError("User not found", 404);
  return user;
};

const getAllUsers = async () => {
  const users = await User.find({});
  return users;
};

module.exports = {
  generateToken,
  register,
  login,
  getUserByUsername,
  getUserById,
  getAllUsers,
};
