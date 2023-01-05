const express = require("express");
const weatherController = require("../controllers/weather.controller");

const router = express.Router({ mergeParams: true });

router.route("/").get(weatherController.getCities);
router.route("/average").get(weatherController.getAverage);

module.exports = router;
