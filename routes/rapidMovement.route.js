const express = require("express");
const {
  createRapidMovement,
  getRapidMovement,
  deleteRapidMovement,
  updateRapidMovement,
  getRapidMovementById,
  getSpecificRapidMovement,
} = require("../controllers/rapidMovement.controller");
const router = express.Router();

router.post("/addRapidMovement", createRapidMovement);
router.get("/getRapidMovement", getRapidMovement);
router.get("/getRapidMovementById/:id", getRapidMovementById);
router.delete("/deleteRapidMovement/:id", deleteRapidMovement);
router.route("/updateRapidMovement/:id").patch(updateRapidMovement);
router.route("/specific").get(getSpecificRapidMovement);

module.exports = router;
