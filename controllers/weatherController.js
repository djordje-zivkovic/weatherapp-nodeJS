const cities = require("../utils/cities");
const { getData } = require("./utils/api.js");

exports.getCities = async (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: `Chosen cities are : ${cities[0]}, ${cities[1]} and ${cities[2]}`,
  });
};

exports.getAverage = async (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "everything ok",
  });
};
