const express = require("express");


const {
  createPackage,
  getPackage,
  deletePackage,
  updatePackage,
  getPackageById,
  getSpecificPackage,
  paymentSuccess,
  paymentFail,
  paymentCancel,
} = require("../controllers/package.controller");
const { verifyJwt } = require("../Hooks/verifyJwt");
const router = express.Router();

router.post("/addPackage",verifyJwt,createPackage);
router.post("/payment/success/:tran_id", paymentSuccess);
router.post("/payment/fail/:tran_id", paymentFail);
router.post("/payment/cancel/:tran_id", paymentCancel);
router.get("/getPackage", getPackage);
router.get("/getPackageById/:id", getPackageById);
router.delete("/deletePackage/:id", deletePackage);
router.route("/updatePackage/:id").patch(updatePackage);
router.route("/specific").get(getSpecificPackage);

module.exports = router;
