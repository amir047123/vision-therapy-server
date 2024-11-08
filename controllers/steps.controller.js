const Steps = require("../models/steps.model");
const {
  createStepsService,
  deleteStepsService,
  updateStepsService,
  getStepsByIdService,
} = require("../services/steps.service");
// for property post
exports.createSteps = async (req, res) => {
  console.log(req.body);
  try {
    const newSteps = await createStepsService(req.body);
    res.status(200).json({
      status: "success",
      message: "data inserted successfully!",
      data: newSteps,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// get Steps
exports.getSteps = async (req, res) => {
  try {
    let steps = await Steps.find({});
    res.status(200).json({
      status: "success",
      data: steps,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// delete Steps
exports.deleteSteps = async (req, res) => {
  try {
    const id = req.params.id;
    const classRoom = await deleteStepsService(id);
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

// update Steps
exports.updateSteps = async (req, res) => {
  const { id } = req.params;
  try {
    const steps = await updateStepsService(id, req.body);

    if (!steps.modifiedCount) {
      return res.status(400).json({
        status: "fail",
        message: "couldn't update",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Steps updated successfully",
      data: steps,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Internal error. couldn't update steps ",
      error: error.message,
    });
  }
};

exports.getStepsById = async (req, res) => {
  const { id } = req.params;
  try {
    const classRoom = await getStepsByIdService(id);

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

// get Specific Steps
exports.getSpecificSteps = async (req, res) => {
  const page = +req.query?.page;
  const size = +req.query?.size;
  const fieldName = req.query?.fieldName;
  const fieldValue = req.query?.fieldValue;
  const fieldName2 = req.query?.fieldName2;
  const fieldValue2 = req.query?.fieldValue2;
  const fieldName3 = req.query?.fieldName3;
  const fieldValue3 = req.query?.fieldValue3;

  try {
    let stepss = await Steps.find({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    })
      .skip(page * size)
      .limit(size);
    const total = await Steps.countDocuments({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    });
    res.status(200).json({
      status: "success",
      data: stepss,
      total: total,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};
