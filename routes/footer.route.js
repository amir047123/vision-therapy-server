const express = require("express");
const {
  createFooter,
  getFooter,
  deleteFooter,
  updateFooter,
  getFooterById,
  getSpecificFooter,
} = require("../controllers/footer.controller");
const router = express.Router();

router.post("/addFooter", createFooter);
router.get("/getFooter", getFooter);
router.get("/getFooterById/:id", getFooterById);
router.delete("/deleteFooter/:id", deleteFooter);
router.route("/updateFooter/:id").patch(updateFooter);
router.route("/specific").get(getSpecificFooter);

module.exports = router;
