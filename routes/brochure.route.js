const express = require("express");
const {
  createBrochure,
  getBrochure,
  deleteBrochure,
  updateBrochure,
  getBrochureById,
  getSpecificBrochure,
} = require("../controllers/brochure.controller");
const router = express.Router();

router.post("/addBrochure", createBrochure);
router.get("/getBrochure", getBrochure);
router.get("/getBrochureById/:id", getBrochureById);
router.delete("/deleteBrochure/:id", deleteBrochure);
router.route("/updateBrochure/:id").patch(updateBrochure);
router.route("/specific").get(getSpecificBrochure);

module.exports = router;
