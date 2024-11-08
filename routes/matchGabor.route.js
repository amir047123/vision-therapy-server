const express = require("express");
const {
  createMatchGabor,
  getMatchGabor,
  deleteMatchGabor,
  updateMatchGabor,
  getMatchGaborById,
  getSpecificMatchGabor,
} = require("../controllers/matchGabor.controller");
const router = express.Router();

router.post("/addMatchGabor", createMatchGabor);
router.get("/getMatchGabor", getMatchGabor);
router.get("/getMatchGaborById/:id", getMatchGaborById);
router.delete("/deleteMatchGabor/:id", deleteMatchGabor);
router.route("/updateMatchGabor/:id").patch(updateMatchGabor);
router.route("/specific").get(getSpecificMatchGabor);

module.exports = router;
