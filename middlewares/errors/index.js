const AppLog = require("../../services/AppLog");
class AppError extends Error {
  constructor(message, statusCode, status) {
    super(message);

    this.statusCode = statusCode;
    this.status = status;
    Error.captureStackTrace(this, this.constructor);
  }
}

const handleError = (fn) => (req, res, next) => fn(req, res, next).catch(next);

const handleErrors = async (error, req, res, next) => {
  const { statusCode = 500, status = "error", message } = error;
  if (error.statusCode >= 400 && error.statusCode < 500) {
    AppLog.createLog("warning", error.message, "system", "handleErrors");
  }
  if (error.statusCode >= 500) {
    AppLog.createLog("error", error.message, "system", "handleErrors");
  }
  return res.status(statusCode).send({ status, message });
};
module.exports = {
  handleErrors,
  AppError,
  handleError,
};
