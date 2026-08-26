const truckRoute = require("./routes/truckRoute");
const express = require("express");
const cors = require("cors");

const dashboardRoutes = require("./routes/dashboardRoutes");
const dockRoute = require("./routes/dockRoute");
const alertRoute = require("./routes/alertRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "NexSupply API is running"
    });
});

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/docks", dockRoute);
app.use("/api/trucks", truckRoute);
app.use("/api/alerts", alertRoute);

module.exports = app;