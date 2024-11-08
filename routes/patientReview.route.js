const express = require("express");
const {
  createPatientReview,
  getPatientReview,
  deletePatientReview,
  updatePatientReview,
  getPatientReviewById,
  getSpecificPatientReview,
} = require("../controllers/patientReview.controller");
const router = express.Router();

router.post("/addPatientReview", createPatientReview);
router.get("/getPatientReview", getPatientReview);
router.get("/getPatientReviewById/:id", getPatientReviewById);
router.delete("/deletePatientReview/:id", deletePatientReview);
router.route("/updatePatientReview/:id").patch(updatePatientReview);
router.route("/specific").get(getSpecificPatientReview);

module.exports = router;
