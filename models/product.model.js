const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,

    min: 0.01,
  },
  stock: {
    type: Number,

    min: 0,
  },
  imageUrl: {
    type: String,
  },
  categories: {
    type: String,
  },
  weight: {
    type: String,
  },
  dimensions: {
    type: String,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
