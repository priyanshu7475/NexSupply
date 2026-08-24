const express = require("express");
const router = express.Router();

const {
    getDashboardKPIs
} = require("../controllers/dashboardController");

router.get("/kpis", getDashboardKPIs);

module.exports = router;