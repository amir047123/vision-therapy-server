const express = require("express");
const {
  createSmoothMovement,
  getSmoothMovement,
  deleteSmoothMovement,
  updateSmoothMovement,
  getSmoothMovementById,
  getSpecificSmoothMovement,
} = require("../controllers/smoothMovement.controller");
const router = express.Router();

router.post("/addSmoothMovement", createSmoothMovement);
router.get("/getSmoothMovement", getSmoothMovement);
router.get("/getSmoothMovementById/:id", getSmoothMovementById);
router.delete("/deleteSmoothMovement/:id", deleteSmoothMovement);
router.route("/updateSmoothMovement/:id").patch(updateSmoothMovement);
router.route("/specific").get(getSpecificSmoothMovement);

module.exports = router;
