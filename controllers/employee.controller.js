const employeeService = require("../services/employee");
const createEmployee = async (req, res) => {
  const employee = await employeeService.createEmployee(req.body);
  res.status(200).json(employee);
};

const getAllEmployees = async (req, res) => {
  const employee = await employeeService.getAllEmployees();
  res.status(200).json({ count: employee.length, employees: employee });
};

const getEmployee = async (req, res) => {
  const employee = await employeeService.getEmployee(req.query.id);
  return res.status(200).json(employee);
};

const updateEmployee = async (req, res) => {
  await employeeService.updateEmployee(req.body);
  return res.status(200).json("Update susscessfully!");
};
const deleteEmployee = async (req, res) => {
  await employeeService.deleteEmployee(req.query.employeeNumber);
  return res.status(200).json("Deleted sucessfully!");
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};
