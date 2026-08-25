const express = require("express");
const router = express.Router();

const {
    getTruckStatus
} = require("../controllers/truckController");

router.get("/status", getTruckStatus);

module.exports = router;