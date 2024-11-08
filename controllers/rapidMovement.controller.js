const RapidMovement = require("../models/rapidMovement.model");
const {
  createRapidMovementService,
  deleteRapidMovementService,
  updateRapidMovementService,
  getRapidMovementByIdService,
} = require("../services/rapidMovement.service");
// for property post
exports.createRapidMovement = async (req, res) => {
  console.log(req.body);
  try {
    const newRapidMovement = await createRapidMovementService(req.body);
    res.status(200).json({
      status: "success",
      message: "data inserted successfully!",
      data: newRapidMovement,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// get RapidMovement
exports.getRapidMovement = async (req, res) => {
  try {
    let classRoom = await RapidMovement.find({});
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

// delete RapidMovement
exports.deleteRapidMovement = async (req, res) => {
  try {
    const id = req.params.id;
    const classRoom = await deleteRapidMovementService(id);
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

// update RapidMovement
exports.updateRapidMovement = async (req, res) => {
  const { id } = req.params;
  try {
    const rapidMovement = await updateRapidMovementService(id, req.body);

    if (!rapidMovement.modifiedCount) {
      return res.status(400).json({
        status: "fail",
        message: "couldn't update",
      });
    }
    res.status(200).json({
      status: "success",
      message: "RapidMovement updated successfully",
      data: rapidMovement,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Internal error. couldn't update rapidMovement ",
      error: error.message,
    });
  }
};

exports.getRapidMovementById = async (req, res) => {
  const { id } = req.params;
  try {
    const classRoom = await getRapidMovementByIdService(id);

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

// get Specific RapidMovement
exports.getSpecificRapidMovement = async (req, res) => {
  const page = +req.query?.page;
  const size = +req.query?.size;
  const fieldName = req.query?.fieldName;
  const fieldValue = req.query?.fieldValue;
  const fieldName2 = req.query?.fieldName2;
  const fieldValue2 = req.query?.fieldValue2;
  const fieldName3 = req.query?.fieldName3;
  const fieldValue3 = req.query?.fieldValue3;

  try {
    let rapidMovements = await RapidMovement.find({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    })
      .skip(page * size)
      .limit(size);
    const total = await RapidMovement.countDocuments({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    });
    res.status(200).json({
      status: "success",
      data: rapidMovements,
      total: total,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};
