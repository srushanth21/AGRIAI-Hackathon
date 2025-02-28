const axios = require("axios");

const getWeatherForecast = async (lat, lon, cnt) => {
  console.log("Function called with:", lat, lon); // Debug log

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
      params: {
        lat,
        lon,
        cnt: cnt, // 10-day forecast
        units: "metric",
        appid: process.env.WEATHER_API_KEY, // Ensure API key is set
      },
    });

    console.log("API Response received");
    return response.data;
  } catch (error) {
    console.error("Error fetching weather:", error.message);
    return null;
  }
};

module.exports = { getWeatherForecast };
