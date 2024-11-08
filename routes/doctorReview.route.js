const express = require("express");
const {
  createDoctorReview,
  getDoctorReview,
  deleteDoctorReview,
  updateDoctorReview,
  getDoctorReviewById,
  getSpecificDoctorReview,
} = require("../controllers/doctorReview.controller");
const router = express.Router();

router.post("/addDoctorReview", createDoctorReview);
router.get("/getDoctorReview", getDoctorReview);
router.get("/getDoctorReviewById/:id", getDoctorReviewById);
router.delete("/deleteDoctorReview/:id", deleteDoctorReview);
router.route("/updateDoctorReview/:id").patch(updateDoctorReview);
router.route("/specific").get(getSpecificDoctorReview);

module.exports = router;
