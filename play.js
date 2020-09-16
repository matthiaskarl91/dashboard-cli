const weather = require("weather-js");
const util = require("util");

const findWeather = util.promisify(weather.find);

findWeather({
  search: "Munich, Germany",
  degreeType: "C",
})
  .then((res) => console.log(JSON.stringify(res, null, 2)))
  .catch((err) => console.error(err));
