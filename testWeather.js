require("dotenv").config(); // Ensure you have .env with API key
const { getWeatherForecast } = require("./config/openWeather"); // Update the path

const testLat = 20.456; // Replace with a valid latitude
const testLon = 73.123; // Replace with a valid longitude

(async () => {
  console.log("Fetching weather forecast...");
  const forecast = await getWeatherForecast(testLat, testLon, cnt);
  console.log(JSON.stringify(forecast, null, 2)); // Pretty print response
})();
