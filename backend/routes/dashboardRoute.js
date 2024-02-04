const express = require("express");
const router = express.Router();
const { fetchStats } = require("../controllers/dashboardController");

router.route("/").get(fetchStats);

module.exports = router;