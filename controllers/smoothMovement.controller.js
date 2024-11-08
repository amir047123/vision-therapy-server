const SmoothMovement = require("../models/smoothMovement.models");
const {
  createSmoothMovementService,
  deleteSmoothMovementService,
  updateSmoothMovementService,
  getSmoothMovementByIdService,
} = require("../services/smoothMovement.service");
// for property post
exports.createSmoothMovement = async (req, res) => {
  console.log(req.body);
  try {
    const newSmoothMovement = await createSmoothMovementService(req.body);
    res.status(200).json({
      status: "success",
      message: "data inserted successfully!",
      data: newSmoothMovement,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// get SmoothMovement
exports.getSmoothMovement = async (req, res) => {
  try {
    let classRoom = await SmoothMovement.find({});
    res.status(200).json({
      status: "success",
      data: classRoom,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// delete SmoothMovement
exports.deleteSmoothMovement = async (req, res) => {
  try {
    const id = req.params.id;
    const classRoom = await deleteSmoothMovementService(id);
    res.status(200).json({
      status: "success",
      data: classRoom,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

// update SmoothMovement
exports.updateSmoothMovement = async (req, res) => {
  const { id } = req.params;
  try {
    const smoothMovement = await updateSmoothMovementService(id, req.body);

    if (!smoothMovement.modifiedCount) {
      return res.status(400).json({
        status: "fail",
        message: "couldn't update",
      });
    }
    res.status(200).json({
      status: "success",
      message: "SmoothMovement updated successfully",
      data: smoothMovement,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Internal error. couldn't update smoothMovement ",
      error: error.message,
    });
  }
};

exports.getSmoothMovementById = async (req, res) => {
  const { id } = req.params;
  try {
    const classRoom = await getSmoothMovementByIdService(id);

    res.status(200).json({
      status: "success",
      data: classRoom,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "internal error",
      error: error.message,
    });
  }
};

// get Specific SmoothMovement
exports.getSpecificSmoothMovement = async (req, res) => {
  const page = +req.query?.page;
  const size = +req.query?.size;
  const fieldName = req.query?.fieldName;
  const fieldValue = req.query?.fieldValue;
  const fieldName2 = req.query?.fieldName2;
  const fieldValue2 = req.query?.fieldValue2;
  const fieldName3 = req.query?.fieldName3;
  const fieldValue3 = req.query?.fieldValue3;

  try {
    let smoothMovements = await SmoothMovement.find({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    })
      .skip(page * size)
      .limit(size);
    const total = await SmoothMovement.countDocuments({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    });
    res.status(200).json({
      status: "success",
      data: smoothMovements,
      total: total,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};
