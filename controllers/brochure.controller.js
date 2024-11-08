const Brochure = require("../models/brochure.model");
const {
  createBrochureService,
  deleteBrochureService,
  updateBrochureService,
  getBrochureByIdService,
} = require("../services/brochure.service");
// for property post
exports.createBrochure = async (req, res) => {
  console.log(req.body);
  try {
    const newBrochure = await createBrochureService(req.body);
    res.status(200).json({
      status: "success",
      message: "data inserted successfully!",
      data: newBrochure,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// get Brochure
exports.getBrochure = async (req, res) => {
  try {
    let brochure = await Brochure.find({});
    res.status(200).json({
      status: "success",
      data: brochure,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// delete Brochure
exports.deleteBrochure = async (req, res) => {
  try {
    const id = req.params.id;
    const classRoom = await deleteBrochureService(id);
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

// update Brochure
exports.updateBrochure = async (req, res) => {
  const { id } = req.params;
  try {
    const brochure = await updateBrochureService(id, req.body);

    if (!brochure.modifiedCount) {
      return res.status(400).json({
        status: "fail",
        message: "couldn't update",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Brochure updated successfully",
      data: brochure,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Internal error. couldn't update brochure ",
      error: error.message,
    });
  }
};

exports.getBrochureById = async (req, res) => {
  const { id } = req.params;
  try {
    const classRoom = await getBrochureByIdService(id);

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

// get Specific Brochure
exports.getSpecificBrochure = async (req, res) => {
  const page = +req.query?.page;
  const size = +req.query?.size;
  const fieldName = req.query?.fieldName;
  const fieldValue = req.query?.fieldValue;
  const fieldName2 = req.query?.fieldName2;
  const fieldValue2 = req.query?.fieldValue2;
  const fieldName3 = req.query?.fieldName3;
  const fieldValue3 = req.query?.fieldValue3;

  try {
    let brochures = await Brochure.find({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    })
      .skip(page * size)
      .limit(size);
    const total = await Brochure.countDocuments({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    });
    res.status(200).json({
      status: "success",
      data: brochures,
      total: total,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};
