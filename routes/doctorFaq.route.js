const express = require("express");
const {
  createDoctorFaq,
  getDoctorFaq,
  deleteDoctorFaq,
  updateDoctorFaq,
  getDoctorFaqById,
  getSpecificDoctorFaq,
} = require("../controllers/doctorFaq.controller");
const router = express.Router();

router.post("/addDoctorFaq", createDoctorFaq);
router.get("/getDoctorFaq", getDoctorFaq);
router.get("/getDoctorFaqById/:id", getDoctorFaqById);
router.delete("/deleteDoctorFaq/:id", deleteDoctorFaq);
router.route("/updateDoctorFaq/:id").patch(updateDoctorFaq);
router.route("/specific").get(getSpecificDoctorFaq);

module.exports = router;
