const express = require("express");
const {
  createRockChart,
  getRockChart,
  deleteRockChart,
  updateRockChart,
  getRockChartById,
  getSpecificRockChart,
} = require("../controllers/rockChart.controller");
const router = express.Router();

router.post("/addRockChart", createRockChart);
router.get("/getRockChart", getRockChart);
router.get("/getRockChartById/:id", getRockChartById);
router.delete("/deleteRockChart/:id", deleteRockChart);
router.route("/updateRockChart/:id").patch(updateRockChart);
router.route("/specific").get(getSpecificRockChart);

module.exports = router;
