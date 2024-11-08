const express = require("express");
const {
  createLecture,
  getLecture,
  deleteLecture,
  updateLecture,
  getLectureById,
  getSpecificLecture,
} = require("../controllers/lecture.controller");
const router = express.Router();

router.post("/addLecture", createLecture);
router.get("/getLecture", getLecture);
router.get("/getLectureById/:id", getLectureById);
router.delete("/deleteLecture/:id", deleteLecture);
router.route("/updateLecture/:id").patch(updateLecture);
router.route("/specific").get(getSpecificLecture);

module.exports = router;
