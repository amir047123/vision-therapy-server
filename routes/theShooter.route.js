const express = require("express");
const {
  createTheShooter,
  getTheShooter,
  deleteTheShooter,
  updateTheShooter,
  getTheShooterById,
  getSpecificTheShooter,
} = require("../controllers/theShooter.controller");
const router = express.Router();

router.post("/addTheShooter", createTheShooter);
router.get("/getTheShooter", getTheShooter);
router.get("/getTheShooterById/:id", getTheShooterById);
router.delete("/deleteTheShooter/:id", deleteTheShooter);
router.route("/updateTheShooter/:id").patch(updateTheShooter);
router.route("/specific").get(getSpecificTheShooter);

module.exports = router;
