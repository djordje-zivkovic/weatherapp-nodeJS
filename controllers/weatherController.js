const cities = require("../utils/cities");
const { getData } = require("../utils/api.js");

exports.getCities = async (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: `Chosen cities are : ${cities[0]}, ${cities[1]} and ${cities[2]}`,
  });
};

exports.getAverage = async (req, res, next) => {
  city = req.query.city?.split(",");
  interval = req.query.interval;
  const cityData = [];

  if (city) {
    for (let i = 0; i < city.length; i++) {
      const data = await getData(city[i], interval);
      cityData.push({ city: city[i], data });
    }
  } else {
    for (let i = 0; i < cities.length; i++) {
      const data = await getData(cities[i], interval);
      cityData.push({ city: cities[i], data });
    }
  }

  cityData.sort((a, b) => b.data - a.data);

  let message = "";
  cityData.forEach((item) => {
    message += `For ${item.city}, we have ${item.data.toFixed(2)} (avg temp). `;
  });

  res.status(200).json({
    status: "success",
    message,
  });
};
