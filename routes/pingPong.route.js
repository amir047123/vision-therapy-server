const express = require("express");
const {
  createPingPong,
  getPingPong,
  deletePingPong,
  updatePingPong,
  getPingPongById,
  getSpecificPingPong,
} = require("../controllers/pingPong.controller");
const router = express.Router();

router.post("/addPingPong", createPingPong);
router.get("/getPingPong", getPingPong);
router.get("/getPingPongById/:id", getPingPongById);
router.delete("/deletePingPong/:id", deletePingPong);
router.route("/updatePingPong/:id").patch(updatePingPong);
router.route("/specific").get(getSpecificPingPong);

module.exports = router;
