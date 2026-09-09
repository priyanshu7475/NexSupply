const express = require("express");
const router = express.Router();

const {
    getForecast,
    getSupplyDemand,
    getPlanningKPIs
} = require("../controllers/planningController");

router.get("/forecast", getForecast);
router.get("/supply-demand", getSupplyDemand);
router.get("/kpis", getPlanningKPIs);

module.exports = router;