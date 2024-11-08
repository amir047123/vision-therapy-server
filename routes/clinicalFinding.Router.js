const express = require("express");
const router = express.Router();
const clinicalFindingController = require("../controllers/clinicalFinding.Controller");

// Define the routes
router.get("/findings", clinicalFindingController.getAll);
router.get("/findings/:id", clinicalFindingController.getOne);
router.post("/findings", clinicalFindingController.createOne);
router.put("/findings/:id", clinicalFindingController.updateOne);
router.patch("/findings/:id", clinicalFindingController.patchOne);
router.delete("/findings/:id", clinicalFindingController.deleteOne);
router
  .route("/findings/get/specific")
  .get(clinicalFindingController.getSpecific);

// Export the router
module.exports = router;
