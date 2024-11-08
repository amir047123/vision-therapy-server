const express = require("express");
const {
  createWhyMedmyne,
  getWhyMedmyne,
  deleteWhyMedmyne,
  updateWhyMedmyne,
  getWhyMedmyneById,
  getSpecificWhyMedmyne,
} = require("../controllers/whyMedmyne.controller");
const router = express.Router();

router.post("/addWhyMedmyne", createWhyMedmyne);
router.get("/getWhyMedmyne", getWhyMedmyne);
router.get("/getWhyMedmyneById/:id", getWhyMedmyneById);
router.delete("/deleteWhyMedmyne/:id", deleteWhyMedmyne);
router.route("/updateWhyMedmyne/:id").patch(updateWhyMedmyne);
router.route("/specific").get(getSpecificWhyMedmyne);

module.exports = router;
