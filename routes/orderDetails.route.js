const express = require("express");
const {
  createOrderDetails,
  getOrderDetails,
  deleteOrderDetails,
  updateOrderDetails,
  getOrderDetailsById,
  getSpecificOrderDetails,
} = require("../controllers/orderDetails.controller");
const router = express.Router();

router.post("/addOrderDetails", createOrderDetails);
router.get("/getOrderDetails", getOrderDetails);
router.get("/getOrderDetailsById/:id", getOrderDetailsById);
router.delete("/deleteOrderDetails/:id", deleteOrderDetails);
router.route("/updateOrderDetails/:id").patch(updateOrderDetails);
router.route("/specific").get(getSpecificOrderDetails);

module.exports = router;
