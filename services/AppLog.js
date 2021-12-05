const Logger = require("../models/Logger.js");
const { AppError } = require("../middlewares/errors/index");

class AppLog {
  createLog = async (level, message, user, action) => {
    try {
      await new Logger({
        level,
        message,
        user,
        action,
      })
        .save()
        .then((log) => log)
        .catch((err) => {
          throw new AppError(err.message, 500);
        });
    } catch (error) {
      throw new AppError(error.message, 500);
    }
  };
}

module.exports = new AppLog();
