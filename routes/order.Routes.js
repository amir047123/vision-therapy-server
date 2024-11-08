const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.Controller");

// Create an Order
router.post("/", orderController.createOrder);

// Get all Orders
router.get("/", orderController.getAllOrders);

// Get a specific Order by ID
router.get("/:orderId", orderController.getOrderById);

// Update an Order by ID
router.put("/:orderId", orderController.updateOrderById);

// Delete an Order by ID
router.delete("/:orderId", orderController.deleteOrderById);

module.exports = router;
