const express = require("express");
const { all } = require("./routes/weatherRoute");
const weatherRouter = require("./routes/weatherRoute");
const { getData } = require("./utils/api.js");
const cities = require("./utils/cities");

const app = express();
const port = 4000;

app.use("/api/weather", weatherRouter);

app.all("*", (req, res, next) => {
  res.status(404).json({
    message: "Can't find this route on server",
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
