const express = require("express");
const {
  createSteps,
  getSteps,
  deleteSteps,
  updateSteps,
  getStepsById,
  getSpecificSteps,
} = require("../controllers/steps.controller");
const router = express.Router();

router.post("/addSteps", createSteps);
router.get("/getSteps", getSteps);
router.get("/getStepsById/:id", getStepsById);
router.delete("/deleteSteps/:id", deleteSteps);
router.route("/updateSteps/:id").patch(updateSteps);
router.route("/specific").get(getSpecificSteps);

module.exports = router;
