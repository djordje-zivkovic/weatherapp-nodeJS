const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const {
  create,
  getUserByUserEmail,
  getUserByUserId,
  getUsers,
  updateUser,
  deleteUser,
} = require("./../utils/user.service");
const { sign } = require("jsonwebtoken");
const AppError = require("./../utils/appError");

module.exports = {
  createUser: (req, res, next) => {
    console.log(req.body);
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    create(body, (err, results) => {
      if (err) {
        return next(new AppError("Database connection error"), 500);
      }
      return res.status(200).json({
        success: true,
        data: results,
      });
    });
  },
  login: (req, res, next) => {
    const body = req.body;
    getUserByUserEmail(body.email, (err, results) => {
      if (err) {
        return next(err);
      }
      if (!results) {
        return next(new AppError("Invalid email or password"), 400);
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, process.env.JWT_KEY, {
          expiresIn: "1h",
        });
        return res.json({
          success: 1,
          message: "login successfully",
          token: jsontoken,
        });
      } else {
        return next(new AppError("Invalid email or password"), 400);
      }
    });
  },
  getUserByUserId: (req, res, next) => {
    const id = req.params.id;
    getUserByUserId(id, (err, results) => {
      if (err) {
        return next(err);
      }
      if (!results) {
        return next(new AppError("Record not found"), 400);
      }
      results.password = undefined;
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  getUsers: (req, res, next) => {
    getUsers((err, results) => {
      if (err) {
        return next(err);
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  updateUsers: (req, res, next) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateUser(body, (err, results) => {
      if (err) {
        return next(err);
      }
      return res.json({
        success: 1,
        message: "updated successfully",
      });
    });
  },
  deleteUser: (req, res, next) => {
    const data = req.body;
    deleteUser(data, (err, results) => {
      if (err) {
        return next(err);
      }
      if (!results) {
        return next(new AppError("Record not found"), 400);
      }
      return res.json({
        success: 1,
        message: "user deleted successfully",
      });
    });
  },
};
