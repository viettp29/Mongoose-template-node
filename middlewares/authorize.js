/* eslint-disable no-param-reassign */
const constances = require("../utils/constances");
module.exports = function (roles = []) {
  if (typeof roles === "string") {
    roles = [roles];
  }

  return (req, res, next) => {
    const auth = res.locals.authenticated;
    if (auth && roles.length && !roles.includes(auth.jobTitle.toUpperCase())) {
      return res.status(401).json({
        msg: "Không có quyền thực hiện chức năng",
      });
    }
    return next();
  };
};
