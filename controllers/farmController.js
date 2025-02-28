const Farm = require("../models/farmModel");

// Create Farm
const createFarm = async (req, res) => {
  try {
      console.log("Incoming request data:", req.body); // Log incoming data

      const { name, latitude, longitude } = req.body;

      if (!name || !latitude || !longitude) {
          console.error("Missing fields in request body");
          return res.status(400).json({ error: "All fields (name, latitude, longitude) are required" });
      }

      const newFarm = new Farm({ name, latitude, longitude });
      await newFarm.save();

      console.log("Farm created successfully:", newFarm);
      res.status(201).json(newFarm);
  } catch (error) {
      console.error("Error creating farm:", error); // Log the exact error
      res.status(500).json({ error: "Error creating farm", details: error.message });
  }
};


// Get Farms
const getFarms = async (req, res) => {
    try {
        const farms = await Farm.find();
        res.status(200).json(farms);
    } catch (error) {
        res.status(500).json({ error: "Error fetching farms" });
    }
};

// Export controllers
module.exports = { createFarm, getFarms };
