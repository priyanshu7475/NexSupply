const express = require("express");
const router = express.Router();

const {
    getDockStatus,
    getDockThroughput
} = require("../controllers/dockController");

router.get("/status", getDockStatus);

router.get("/throughput", getDockThroughput);

module.exports = router;