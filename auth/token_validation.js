const jwt = require("jsonwebtoken");
const AppError = require("./../utils/appError");
module.exports = {
  checkToken: (req, res, next) => {
    let token = req.headers.authorization;
    if (token) {
      // Remove Bearer from string
      token = token.split(" ")[1];
      jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
          return next(new AppError("Token is not valid"), 400);
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return next(new AppError("Access Denied! Unauthorized User"), 401);
    }
  },
};
