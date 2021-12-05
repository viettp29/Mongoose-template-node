const router = require("express").Router();
const getLogger = require("../services/getLogger.js");

router.get("/time", getLogger.getLogsByTimePeriod);
router.get("/level/:level", getLogger.getLogsByLevel);
router.get("/", getLogger.getAllLogs);

module.exports = router;
