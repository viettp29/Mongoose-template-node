const Customer = require("../models/customer.model");
const { AppError } = require("../middlewares/errors/index");

const createCustomer = async (body) => {
  const findCustomer = await Customer.findOne({
    $or: [{ phone: body.phone }, { customerNumber: body.customerNumber }],
  });
  if (!findCustomer) {
    const customer = await Customer.create(body);
    return customer;
  } else {
    throw new AppError("customer does exist");
  }
};

const getAllCustomers = async () => {
  const customer = await Customer.find({});
  return customer;
};

const getCustomer = async (customerNumber) => {
  const customer = await Customer.findOne({
    customerNumber,
  });
  if (customer) {
    return customer;
  }
  throw new AppError("customer does not exist", 404);
};

const updateCustomer = async (body) => {
  const customer = await Customer.findOne({
    customerNumber: body.customerNumber,
  });
  if (!customer) {
    throw new AppError("customer does not exist", 404);
  }
  const customers = Customer.findOneAndUpdate(
    { customerNumber: body.customerNumber },
    body,
    { new: true }
  );
  return customers;
};

const deleteCustomer = async (customerNumber) => {
  const customer = await Customer.findOne({ customerNumber });
  if (!customer) {
    throw new AppError("customer does not exist", 404);
  }
  await Customer.deleteOne({ customerNumber });
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
};
