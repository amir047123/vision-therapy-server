const OrderDetails = require("../models/orderDetails.model");

exports.createOrderDetailsService = async (data) => {
  const newOrderDetails = await OrderDetails.create(data);
  return newOrderDetails;
};

exports.deleteOrderDetailsService = async (id) => {
  const deletedOrderDetails = await OrderDetails.deleteOne({ _id: id });
  return deletedOrderDetails;
};

exports.updateOrderDetailsService = async (id, data) => {
  const updatedOrderDetails = await OrderDetails.updateOne({ _id: id }, data);
  return updatedOrderDetails;
};

exports.getOrderDetailsByIdService = async (id) => {
  const orderDetails = await OrderDetails.findOne({ _id: id });
  return orderDetails;
};
//hello