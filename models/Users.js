const { Sequelize, DataTypes } = require("sequelize");
const db = require("./../config/database");

const User = db.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
});

db.sync()
  .then(() => {
    console.log("The table for the User model was just (re)created!");
  })
  .catch((error) => {
    console.error("Unable to create users : ", error);
  });

module.exports = User;
