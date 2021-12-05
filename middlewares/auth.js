const jwt = require("jsonwebtoken");
require("dotenv").config();
// const { ROLES } = require("../utils/constances");
const auth = (roles) => {
  return function (req, res, next) {
    const secret = process.env.SECRET_KEY;
    const authorization = req.headers.authorization;
    try {
      const token = authorization.replace("Bearer ", "");
      if (!token) {
        throw new Error("Invalid token");
      }
      const payload = jwt.verify(token, secret);
      if (payload) {
        res.locals.authenticated = payload;
        if (roles.includes(payload.jobTitle)) return next();
      }
      return res.status(403).send({ error: "Forbidden" });
    } catch (error) {
      return res.status(401).send({ error: error.message });
    }
  };
};
module.exports = auth;
