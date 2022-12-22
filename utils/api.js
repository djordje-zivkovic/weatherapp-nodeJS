const api = {
  key: "f6a2fb3e9764cc4cc8fa3044874aa2c4",
  base: "https://api.openweathermap.org/data/2.5/",
};
exports.getData = async (city, interval = 120) => {
  let fetchedData = {};
  await fetch(`${api.base}forecast?q=${city}&units=metric&APPID=${api.key}`)
    .then((res) => res.json())
    .then((res) => (fetchedData = res));

  const allTemperatures = fetchedData.list?.map((periodTemperature) => {
    return periodTemperature.main.temp;
  });

  const intervalArray = interval / 3;

  const intervalTemperature = allTemperatures?.slice(0, intervalArray);

  const totalAverageTemperature =
    intervalTemperature?.reduce((a, b) => a + b, 0) /
    intervalTemperature?.length;

  return totalAverageTemperature;
};
