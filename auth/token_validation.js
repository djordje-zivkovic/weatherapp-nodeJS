const jwt = require("jsonwebtoken");
module.exports = {
  checkToken: (req, res, next) => {
    console.log(req.headers.authorization);
    let token = req.headers.authorization;
    if (token) {
      // Remove Bearer from string
      token = token.split(" ")[1];
      jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
          return res.json({
            success: 0,
            message: err,
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.json({
        success: 0,
        message: "Access Denied! Unauthorized User",
      });
    }
  },
};
