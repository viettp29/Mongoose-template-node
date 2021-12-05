const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
  {
    employeeNumber: { type: Number, unique: true },
    lastName: String,
    firstName: String,
    extension: String,
    email: { type: String, unique: true },
    officeCode: String,
    reportsTo: Number,
    jobTitle: String,
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
