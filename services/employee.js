const Employee = require("../models/employee.model");
const { AppError } = require("../middlewares/errors/index");
const AppLog = require("./AppLog");
const createEmployee = async (body) => {
  const findEmployee = await Employee.findOne({
    $or: [{ email: body.email }, { employeeNumber: body.employeeNumber }],
  });
  if (!findEmployee) {
    const employee = await Employee.create(body);
    if (!employee) {
      throw new AppError("server error", 500);
    }
    AppLog.createLog(
      "info",
      `${res.locals.authenticated.username} createEmployee`,
      `${res.locals.authenticated.username}`,
      `Create employee ${employee.employeeNumber}`
    );
    return employee;
  } else {
    throw new AppError("employee does exist", 400);
  }
};

const getAllEmployees = async () => {
  const employee = await Employee.find({});
  if (!employee) {
    throw new AppError("Employees not found", 404);
  }
  AppLog.createLog(
    "info",
    `${res.locals.authenticated.username} getAllEmployees`,
    `${res.locals.authenticated.username}`,
    "Get all employees"
  );
  return employee;
};

const getEmployee = async (employeeNumber) => {
  const employee = await Employee.findOne({
    employeeNumber,
  });
  if (employee) {
    AppLog.createLog(
      "info",
      `${res.locals.authenticated.username} getEmployeeByNumber`,
      `${res.locals.authenticated.username}`,
      "Get employee by number"
    );
    return employee;
  }
  throw new AppError("employee does not exist", 404);
};

const updateEmployee = async (body) => {
  const employee = await Employee.findOne({
    employeeNumber: body.employeeNumber,
  });
  if (!employee) {
    throw new AppError("employee does not exist", 404);
  }
  const employees = Employee.findOneAndUpdate(
    { employeeNumber: body.employeeNumber },
    body,
    { new: true }
  );
  if (!employees) {
    throw new AppError("server error", 500);
  }
  AppLog.createLog(
    "info",
    `${res.locals.authenticated.username} updateEmployee`,
    `${res.locals.authenticated.username}`,
    `Update employee ${employee.employeeNumber}`
  );
  return employees;
};

const deleteEmployee = async (employeeId) => {
  const employee = await Employee.findOne({ employeeNumber: employeeId });
  if (!employee) {
    throw new AppError("employee does not exist", 404);
  }
  const deleted = await Employee.deleteOne({ employeeNumber: employeeId });
  if (deleted) {
    AppLog.createLog(
      "info",
      `${res.locals.authenticated.username} deleteEmployee`,
      `${res.locals.authenticated.username}`,
      `Delete employee ${employee.employeeNumber}`
    );
  }
  throw new AppError("server error", 500);
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};
