const express = require("express");
const app = express();

const dataRoutes = require("./routes/dataRoutes");
const cors = require("cors");
app.use(cors());
// middleware
app.use(express.json());

// routes
app.use("/api/data", dataRoutes);

module.exports = app;