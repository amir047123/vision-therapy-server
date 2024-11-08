const express = require("express");
const {
  createColorTrap,
  getColorTrap,
  deleteColorTrap,
  updateColorTrap,
  getColorTrapById,
  getSpecificColorTrap,
} = require("../controllers/colorTrap.controller");
const router = express.Router();

router.post("/addColorTrap", createColorTrap);
router.get("/getColorTrap", getColorTrap);
router.get("/getColorTrapById/:id", getColorTrapById);
router.delete("/deleteColorTrap/:id", deleteColorTrap);
router.route("/updateColorTrap/:id").patch(updateColorTrap);
router.route("/specific").get(getSpecificColorTrap);

module.exports = router;
