const express = require('express');
const axios = require('axios');
const router = express.Router();

require("dotenv").config(); // Ensure API key is set
const { getWeatherForecast } = require('../config/openWeather'); // Adjust path as needed
const Farm = require('../models/farmModel'); // Import Farm model

// Current Weather Route
router.get('/:farmId', async (req, res) => {
    try {
        const { farmId } = req.params;
        console.log("Fetching weather for farm:", farmId);

        const farm = await Farm.findById(farmId);
        if (!farm) {
            return res.status(404).json({ error: "Farm not found" });
        }

        const { latitude, longitude } = farm;
        console.log(`Farm Location: Latitude ${latitude}, Longitude ${longitude}`);

        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                lat: latitude,
                lon: longitude,
                appid: process.env.WEATHER_API_KEY,
                units: "metric",
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error("Weather API Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
});

// Weather Forecast Route (supports 'cnt' for number of days)
router.get('/:farmId/forecast', async (req, res) => {
    try {
        const { farmId } = req.params;
        const { cnt } = req.query; // Get number of days from query params
        console.log(`Fetching ${cnt}-day weather forecast for farm:`, farmId);

        const farm = await Farm.findById(farmId);
        if (!farm) {
            return res.status(404).json({ error: "Farm not found" });
        }

        const { latitude, longitude } = farm;
        console.log(`Farm Location: Latitude ${latitude}, Longitude ${longitude}`);

        const forecast = await getWeatherForecast(latitude, longitude, cnt || 7); // Default to 7 days if not provided

        if (!forecast) {
            return res.status(500).json({ error: "Failed to fetch forecast data" });
        }

        res.json(forecast);
    } catch (error) {
        console.error("Weather Forecast API Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch weather forecast data" });
    }
});

module.exports = router;
