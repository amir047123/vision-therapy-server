const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  companyName: String,
  country: String,
  streetAddress: String,
  apartment: String,
  townCity: String,
  state: String,
  pinCode: String,
  phone: String,
  emailAddress: String,

  shippingMethod: String,
  orderNotes: String,
  status: {
    type: String,
    default: "Pending",
  },

  cartItems: {
    type: Array,
  },

  subtotal: Number,
  shippingCost: Number,
  tax: Number,
  total: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
