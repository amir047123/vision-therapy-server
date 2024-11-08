const ColorTrap = require("../models/colorTrap.model");
const {
  createColorTrapService,
  deleteColorTrapService,
  updateColorTrapService,
  getColorTrapByIdService,
} = require("../services/colorTrap.service");
// for property post
exports.createColorTrap = async (req, res) => {
  console.log(req.body);
  try {
    const newColorTrap = await createColorTrapService(req.body);
    res.status(200).json({
      status: "success",
      message: "data inserted successfully!",
      data: newColorTrap,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// get ColorTrap
exports.getColorTrap = async (req, res) => {
  try {
    let classRoom = await ColorTrap.find({});
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

// delete ColorTrap
exports.deleteColorTrap = async (req, res) => {
  try {
    const id = req.params.id;
    const classRoom = await deleteColorTrapService(id);
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

// update ColorTrap
exports.updateColorTrap = async (req, res) => {
  const { id } = req.params;
  try {
    const colorTrap = await updateColorTrapService(id, req.body);

    if (!colorTrap.modifiedCount) {
      return res.status(400).json({
        status: "fail",
        message: "couldn't update",
      });
    }
    res.status(200).json({
      status: "success",
      message: "ColorTrap updated successfully",
      data: colorTrap,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Internal error. couldn't update colorTrap ",
      error: error.message,
    });
  }
};

exports.getColorTrapById = async (req, res) => {
  const { id } = req.params;
  try {
    const classRoom = await getColorTrapByIdService(id);

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

// get Specific ColorTrap
exports.getSpecificColorTrap = async (req, res) => {
  const page = +req.query?.page;
  const size = +req.query?.size;
  const fieldName = req.query?.fieldName;
  const fieldValue = req.query?.fieldValue;
  const fieldName2 = req.query?.fieldName2;
  const fieldValue2 = req.query?.fieldValue2;
  const fieldName3 = req.query?.fieldName3;
  const fieldValue3 = req.query?.fieldValue3;

  try {
    let colorTraps = await ColorTrap.find({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    })
      .skip(page * size)
      .limit(size);
    const total = await ColorTrap.countDocuments({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    });
    res.status(200).json({
      status: "success",
      data: colorTraps,
      total: total,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};
