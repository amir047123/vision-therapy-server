const express = require("express");
const router = express.Router();
const teamController = require("../controllers/team.Controller");

router.get("/", teamController.getAllTeams);
router.get("/:id", teamController.getSpecificTeam);
router.post("/", teamController.createTeam);
router.put("/:id", teamController.updateTeam);
router.patch("/:id", teamController.patchTeam);
router.delete("/:id", teamController.deleteTeam);

module.exports = router;
