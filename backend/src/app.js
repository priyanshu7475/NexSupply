const express = require("express");
const cors = require("cors");

const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "NexSupply API is running"
    });
});

app.use("/api/dashboard", dashboardRoutes);

module.exports = app;