const customerService = require("../services/customer");

const createCustomer = async (req, res) => {
  try {
    const customer = await customerService.createCustomer(req.body);
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};
const getAllCustomers = async (req, res) => {
  const customer = await customerService.getAllCustomers();
  res.status(200).json({ count: customer.length, customers: customer });
};

const getCustomer = async (req, res) => {
  const customer = await customerService.getCustomer(req.query.id);
  return res.status(200).json(customer);
};

const updateCustomer = async (req, res) => {
  await customerService.updateCustomer(req.body);
  return res.status(200).json("Update susscessfully!");
};
const deleteCustomer = async (req, res) => {
  await customerService.deleteCustomer(req.query.id);
  return res.status(200).json("Deleted sucessfully!");
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
};
