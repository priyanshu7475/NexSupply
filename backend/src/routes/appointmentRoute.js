const express = require("express");

const {
    getHourlyArrivals
} = require("../controllers/appointmentController");

const router = express.Router();

router.get("/hourly-arrivals", getHourlyArrivals);

module.exports = router;