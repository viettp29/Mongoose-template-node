const Logger = require("../models/Logger.js");

const getAllLogs = async (req, res) => {
  try {
    const log = await Logger.find({});
    return res.json(log);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getLogsByLevel = async (req, res) => {
  try {
    const log = await Logger.find(req.params.level);
    return res.json(log);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getLogsByTimePeriod = async (req, res) => {
  try {
    const dayStart = new Date(req.params.start);
    const dayEnd = new Date(req.params.end);
    const log = await Logger.find({ $and: [{ start: dayStart, end: dayEnd }] });
    return res.json(log);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
module.exports = {
  getAllLogs,
  getLogsByLevel,
  getLogsByTimePeriod,
};
