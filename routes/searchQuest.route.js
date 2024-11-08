const express = require("express");
const {
  createSearchQuest,
  getSearchQuest,
  deleteSearchQuest,
  updateSearchQuest,
  getSearchQuestById,
  getSpecificSearchQuest,
} = require("../controllers/searchQuest.controller");
const router = express.Router();

router.post("/addSearchQuest", createSearchQuest);
router.get("/getSearchQuest", getSearchQuest);
router.get("/getSearchQuestById/:id", getSearchQuestById);
router.delete("/deleteSearchQuest/:id", deleteSearchQuest);
router.route("/updateSearchQuest/:id").patch(updateSearchQuest);
router.route("/specific").get(getSpecificSearchQuest);

module.exports = router;
