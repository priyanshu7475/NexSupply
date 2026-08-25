const express = require("express");
const router = express.Router();

const {
    getDockStatus
} = require("../controllers/dockController");

router.get("/status", getDockStatus);

module.exports = router;