const express = require("express");
const {
  createHero,
  getHero,
  deleteHero,
  updateHero,
  getHeroById,
  getSpecificHero,
} = require("../controllers/hero.controller");
const router = express.Router();

router.post("/addHero", createHero);
router.get("/getHero", getHero);
router.get("/getHeroById/:id", getHeroById);
router.delete("/deleteHero/:id", deleteHero);
router.route("/updateHero/:id").patch(updateHero);
router.route("/specific").get(getSpecificHero);

module.exports = router;
