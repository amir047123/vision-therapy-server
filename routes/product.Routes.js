const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.Controller");

// Add a new product
router.post("/", productController.addProduct);

// Get all products with optional pagination and search
router.get("/", productController.getProducts);

// Get a single product by ID
router.get("/:id", productController.getProductById);

// Update a product fully
router.put("/:id", productController.updateProduct);

// Partially update a product
router.patch("/:id", productController.patchProduct);

// Delete a product
router.delete("/:id", productController.deleteProduct);

module.exports = router;
