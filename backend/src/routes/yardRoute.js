const express = require("express");
const router = express.Router();

const {
    getYardStatus
} = require("../controllers/yardController");

router.get("/", getYardStatus);

module.exports = router;
