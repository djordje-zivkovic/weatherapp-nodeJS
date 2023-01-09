const express = require("express");
const weatherRouter = require("./routes/weather.route");
const { getData } = require("./utils/api.js");
const cities = require("./utils/cities");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/error.controller");
const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const app = express();

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MYSQL Connected...");
  }
});

const port = 4000;

app.use("/api/weather", weatherRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

app.use(globalErrorHandler);

process.on("uncaughtException", function (err) {
  if (err.code === "EADDRINUSE") console.log("Port is already in use");
  else console.log(err);
});
