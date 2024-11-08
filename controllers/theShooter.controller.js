const TheShooter = require("../models/theShooter.model");
const {
  createTheShooterService,
  deleteTheShooterService,
  updateTheShooterService,
  getTheShooterByIdService,
} = require("../services/theShooter.service");
// for property post
exports.createTheShooter = async (req, res) => {
  console.log(req.body);
  try {
    const newTheShooter = await createTheShooterService(req.body);
    res.status(200).json({
      status: "success",
      message: "data inserted successfully!",
      data: newTheShooter,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// get TheShooter
exports.getTheShooter = async (req, res) => {
  try {
    let classRoom = await TheShooter.find({});
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

// delete TheShooter
exports.deleteTheShooter = async (req, res) => {
  try {
    const id = req.params.id;
    const classRoom = await deleteTheShooterService(id);
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

// update TheShooter
exports.updateTheShooter = async (req, res) => {
  const { id } = req.params;
  try {
    const theShooter = await updateTheShooterService(id, req.body);

    if (!theShooter.modifiedCount) {
      return res.status(400).json({
        status: "fail",
        message: "couldn't update",
      });
    }
    res.status(200).json({
      status: "success",
      message: "TheShooter updated successfully",
      data: theShooter,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Internal error. couldn't update theShooter ",
      error: error.message,
    });
  }
};

exports.getTheShooterById = async (req, res) => {
  const { id } = req.params;
  try {
    const classRoom = await getTheShooterByIdService(id);

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

// get Specific TheShooter
exports.getSpecificTheShooter = async (req, res) => {
  const page = +req.query?.page;
  const size = +req.query?.size;
  const fieldName = req.query?.fieldName;
  const fieldValue = req.query?.fieldValue;
  const fieldName2 = req.query?.fieldName2;
  const fieldValue2 = req.query?.fieldValue2;
  const fieldName3 = req.query?.fieldName3;
  const fieldValue3 = req.query?.fieldValue3;

  try {
    let theShooters = await TheShooter.find({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    })
      .skip(page * size)
      .limit(size);
    const total = await TheShooter.countDocuments({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    });
    res.status(200).json({
      status: "success",
      data: theShooters,
      total: total,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};
