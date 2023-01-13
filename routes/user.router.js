const express = require("express");
const router = express.Router();
const { checkToken } = require("./../auth/token_validation");

const {
  createUser,
  login,
  getUserByUserId,
  getUsers,
  updateUsers,
  deleteUser,
} = require("../controllers/user.controller");

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserByUserId);
router.post("/login", login);
router.delete("/", checkToken, deleteUser);

module.exports = router;
