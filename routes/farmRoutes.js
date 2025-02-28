const express = require("express");
const router = express.Router();
const { createFarm, getFarms } = require("../controllers/farmController");

// Define routes
router.post("/", createFarm);
router.get("/", getFarms);

module.exports = router;
