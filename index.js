const express = require("express");
const weatherRouter = require("./routes/weather.route");
const { getData } = require("./utils/api.js");
const cities = require("./utils/cities");
const AppError = require("./utils/appError");

const app = express();
const port = 4000;

app.use("/api/weather", weatherRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
