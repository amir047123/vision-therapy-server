const express = require("express");
const {
  createRandomObstacle,
  getRandomObstacle,
  deleteRandomObstacle,
  updateRandomObstacle,
  getRandomObstacleById,
  getSpecificRandomObstacle,
} = require("../controllers/randomObstacle.controller");
const router = express.Router();

router.post("/addRandomObstacle", createRandomObstacle);
router.get("/getRandomObstacle", getRandomObstacle);
router.get("/getRandomObstacleById/:id", getRandomObstacleById);
router.delete("/deleteRandomObstacle/:id", deleteRandomObstacle);
router.route("/updateRandomObstacle/:id").patch(updateRandomObstacle);
router.route("/specific").get(getSpecificRandomObstacle);

module.exports = router;
