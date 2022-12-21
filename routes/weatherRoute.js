const express = require("express");
const weatherController = require("../controllers/weatherController");

const router = express.Router({ mergeParams: true });

router.route("/").get(weatherController.getCityWeather);

module.exports = router;
