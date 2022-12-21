const express = require("express");
const weatherRouter = require("./routes/weatherRoute");
const { getData } = require("./utils/api");

const app = express();
const port = 4000;

getData("Berlin");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/weather", weatherRouter);

app.all("*", (req, res, next) => {
  res.status(404).json({
    message: "Can't find this route on server",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
