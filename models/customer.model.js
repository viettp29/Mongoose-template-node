const mongoose = require("mongoose");
const { Schema } = mongoose;
const customerSchema = Schema(
  {
    customerNumber: { type: Number, unique: true },
    customerName: String,
    contactLastName: String,
    contactFirstName: String,
    phone: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
    salesRepEmployeeNumber: Number,
    creditLimit: Number,
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
