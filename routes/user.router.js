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
router.get("/", checkToken, getUsers);
router.get("/:id", checkToken, getUserByUserId);
router.post("/login", login);
router.patch("/", checkToken, updateUsers);
router.delete("/", checkToken, deleteUser);

module.exports = router;
