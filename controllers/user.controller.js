const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const AppError = require("./../utils/appError");

const db = require("./../config/database");
const User = require("./../models/Users");

module.exports = {
  createUser: (req, res, next) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
      .then((result) =>
        res.status(200).json({
          success: true,
          data: result,
        })
      )
      .catch((err) => next(new AppError("Database connection error"), 500));
  },
  login: async (req, res, next) => {
    const body = req.body;
    const user1 = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (user1) {
      const password_valid = await compareSync(body.password, user1.password);
      console.log(password_valid);
      if (password_valid) {
        const jsontoken = sign({ user1 }, process.env.JWT_KEY, {
          expiresIn: "1h",
        });
        res.status(200).json({ token: jsontoken });
      } else {
        res.status(400).json({ error: "Password Incorrect" });
      }
    } else {
      res.status(404).json({ error: "User does not exist" });
    }
  },

  getUserByUserId: (req, res, next) => {
    User.findAll({
      where: {
        id: req.params.id,
      },
    })
      .then((results) =>
        res.json({ success: 1, name: results[0].name, email: results[0].email })
      )
      .catch((err) => next(err));
  },
  getUsers: async (req, res, next) => {
    await User.findAll()
      .then((results) => res.json({ success: 1, name: results }))
      .catch((err) => console.log(err));
  },

  deleteUser: async (req, res, next) => {
    await User.destroy({
      where: {
        email: req.body.email,
      },
    })
      .then((response) => res.json({ response }))
      .catch((err) => res.json({ err }));
  },
};
