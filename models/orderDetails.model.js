const mongoose = require("mongoose");

const OrderDetailsSchema = new mongoose.Schema({
    shippingCost: {
        type: Number,
      },
      taxRate: {
        type: Number,
      },
      

  
});

// Create a model using the schema
const OrderDetails = mongoose.model(
  "OrderDetails",
  OrderDetailsSchema
);

module.exports = OrderDetails;
