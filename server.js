const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const farmRoutes = require("./routes/farmRoutes");
const weatherRoutes = require("./routes/weatherRoutes");

dotenv.config();
const app = express();

app.use(express.json());

// Use farm routes
app.use("/api/farms", farmRoutes);
app.use("/api/weather", weatherRoutes);

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB Connection Error:", err));
