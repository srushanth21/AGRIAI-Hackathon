const axios = require("axios");
const Farm = require("../models/farmModel");

const getWeatherForFarm = async (req, res) => {
    try {
        const { farmId } = req.params;
        const farm = await Farm.findById(farmId);
        
        if (!farm) {
            return res.status(404).json({ error: "Farm not found" });
        }

        const apiKey = "3530196905f4be1ed423f54edcba82aa"; // Replace with actual key
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${farm.latitude}&lon=${farm.longitude}&appid=${apiKey}&units=metric`;

        const response = await axios.get(weatherUrl);
        res.json(response.data);

    } catch (error) {
        res.status(500).json({ error: "Error fetching weather data" });
    }
};

module.exports = { getWeatherForFarm };
