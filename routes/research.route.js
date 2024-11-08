const express = require("express");
const {
  createResearch,
  getResearch,
  deleteResearch,
  updateResearch,
  getResearchById,
  getSpecificResearch,
} = require("../controllers/research.controller");
const router = express.Router();

router.post("/addResearch", createResearch);
router.get("/getResearch", getResearch);
router.get("/getResearchById/:id", getResearchById);
router.delete("/deleteResearch/:id", deleteResearch);
router.route("/updateResearch/:id").patch(updateResearch);
router.route("/specific").get(getSpecificResearch);

module.exports = router;
