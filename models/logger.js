const mongoose = require("mongoose");

const loggerSchema = mongoose.Schema({
  level: {
    type: String,
    enum: ["error", "warn", "info"],
    required: true,
  },
  user: { type: String, required: true },
  message: {
    type: String,
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
});

const Logger = mongoose.model("Logger", loggerSchema);
module.exports = Logger;
