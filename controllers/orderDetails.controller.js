const OrderDetailsModel = require("../models/orderDetails.model");
const {
  createOrderDetailsService,
  deleteOrderDetailsService,
  updateOrderDetailsService,
  getOrderDetailsByIdService,
} = require("../services/orderDetails.service");

// for property post
exports.createOrderDetails = async (req, res) => {
  console.log(req.body);
  try {
    const newOrderDetails = await createOrderDetailsService(req.body);
    res.status(200).json({
      status: "success",
      message: "data inserted successfully!",
      data: newOrderDetails,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// get OrderDetails
exports.getOrderDetails = async (req, res) => {
  const page = +req.query?.page;
  const size = +req.query?.size;
  const fieldName = req.query?.fieldName;
  const fieldValue = req.query?.fieldValue;
  const fieldName2 = req.query?.fieldName2;
  const fieldValue2 = req.query?.fieldValue2;
  const fieldName3 = req.query?.fieldName3;
  const fieldValue3 = req.query?.fieldValue3;
  try {
    let orderDetails = await OrderDetailsModel.find({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    })
      .skip(page * size)
      .limit(size);
    const total = await OrderDetailsModel.countDocuments({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    });
    res.status(200).json({
      status: "success",
      data: orderDetails,
      total: total,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// delete OrderDetails
exports.deleteOrderDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedOrderDetails = await deleteOrderDetailsService(id);
    res.status(200).json({
      status: "success",
      data: deletedOrderDetails,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

// update OrderDetails
exports.updateOrderDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedOrderDetails = await updateOrderDetailsService(id, req.body);

    if (!updatedOrderDetails.modifiedCount) {
      return res.status(400).json({
        status: "fail",
        message: "couldn't update",
      });
    }
    res.status(200).json({
      status: "success",
      message: "OrderDetails updated successfully",
      data: updatedOrderDetails,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Internal error. couldn't update OrderDetails ",
      error: error.message,
    });
  }
};

exports.getOrderDetailsById = async (req, res) => {
  const { id } = req.params;
  try {
    const orderDetails = await getOrderDetailsByIdService(id);

    res.status(200).json({
      status: "success",
      data: orderDetails,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "internal error",
      error: error.message,
    });
  }
};

// get Specific OrderDetails
exports.getSpecificOrderDetails = async (req, res) => {
  const page = +req.query?.page;
  const size = +req.query?.size;
  const fieldName = req.query?.fieldName;
  const fieldValue = req.query?.fieldValue;
  const fieldName2 = req.query?.fieldName2;
  const fieldValue2 = req.query?.fieldValue2;
  const fieldName3 = req.query?.fieldName3;
  const fieldValue3 = req.query?.fieldValue3;

  try {
    let specificOrderDetails = await OrderDetailsModel.find({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    })
      .skip(page * size)
      .limit(size);
    const total = await OrderDetailsModel.countDocuments({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    });
    res.status(200).json({
      status: "success",
      data: specificOrderDetails,
      total: total,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};
