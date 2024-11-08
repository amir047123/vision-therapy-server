const express = require("express");
const {
  createGrow,
  getGrow,
  deleteGrow,
  updateGrow,
  getGrowById,
  getSpecificGrow,
} = require("../controllers/grow.controller");
const router = express.Router();

router.post("/addGrow", createGrow);
router.get("/getGrow", getGrow);
router.get("/getGrowById/:id", getGrowById);
router.delete("/deleteGrow/:id", deleteGrow);
router.route("/updateGrow/:id").patch(updateGrow);
router.route("/specific").get(getSpecificGrow);

module.exports = router;
