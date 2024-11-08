const Grow = require("../models/grow.model");
const {
  createGrowService,
  deleteGrowService,
  updateGrowService,
  getGrowByIdService,
} = require("../services/grow.service");
// for property post
exports.createGrow = async (req, res) => {
  console.log(req.body);
  try {
    const newGrow = await createGrowService(req.body);
    res.status(200).json({
      status: "success",
      message: "data inserted successfully!",
      data: newGrow,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// get Grow
exports.getGrow = async (req, res) => {
  try {
    let grow = await Grow.find({});
    res.status(200).json({
      status: "success",
      data: grow,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// delete Grow
exports.deleteGrow = async (req, res) => {
  try {
    const id = req.params.id;
    const classRoom = await deleteGrowService(id);
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

// update Grow
exports.updateGrow = async (req, res) => {
  const { id } = req.params;
  try {
    const grow = await updateGrowService(id, req.body);

    if (!grow.modifiedCount) {
      return res.status(400).json({
        status: "fail",
        message: "couldn't update",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Grow updated successfully",
      data: grow,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Internal error. couldn't update grow ",
      error: error.message,
    });
  }
};

exports.getGrowById = async (req, res) => {
  const { id } = req.params;
  try {
    const classRoom = await getGrowByIdService(id);

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

// get Specific Grow
exports.getSpecificGrow = async (req, res) => {
  const page = +req.query?.page;
  const size = +req.query?.size;
  const fieldName = req.query?.fieldName;
  const fieldValue = req.query?.fieldValue;
  const fieldName2 = req.query?.fieldName2;
  const fieldValue2 = req.query?.fieldValue2;
  const fieldName3 = req.query?.fieldName3;
  const fieldValue3 = req.query?.fieldValue3;

  try {
    let grows = await Grow.find({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    })
      .skip(page * size)
      .limit(size);
    const total = await Grow.countDocuments({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    });
    res.status(200).json({
      status: "success",
      data: grows,
      total: total,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};
