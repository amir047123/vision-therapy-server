const express = require("express");
const {
  createRainDrop,
  getRainDrop,
  deleteRainDrop,
  updateRainDrop,
  getRainDropById,
  getSpecificRainDrop,
} = require("../controllers/rainDrop.controller");
const router = express.Router();

router.post("/addRainDrop", createRainDrop);
router.get("/getRainDrop", getRainDrop);
router.get("/getRainDropById/:id", getRainDropById);
router.delete("/deleteRainDrop/:id", deleteRainDrop);
router.route("/updateRainDrop/:id").patch(updateRainDrop);
router.route("/specific").get(getSpecificRainDrop);

module.exports = router;
