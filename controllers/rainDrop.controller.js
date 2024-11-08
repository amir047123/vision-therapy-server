const RainDrop = require("../models/rainDrop.model");
const {
  createRainDropService,
  deleteRainDropService,
  updateRainDropService,
  getRainDropByIdService,
} = require("../services/rainDrop.service");
// for property post
exports.createRainDrop = async (req, res) => {
  console.log(req.body);
  try {
    const newRainDrop = await createRainDropService(req.body);
    res.status(200).json({
      status: "success",
      message: "data inserted successfully!",
      data: newRainDrop,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// get RainDrop
exports.getRainDrop = async (req, res) => {
  try {
    let classRoom = await RainDrop.find({});
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

// delete RainDrop
exports.deleteRainDrop = async (req, res) => {
  try {
    const id = req.params.id;
    const classRoom = await deleteRainDropService(id);
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

// update RainDrop
exports.updateRainDrop = async (req, res) => {
  const { id } = req.params;
  try {
    const rainDrop = await updateRainDropService(id, req.body);

    if (!rainDrop.modifiedCount) {
      return res.status(400).json({
        status: "fail",
        message: "couldn't update",
      });
    }
    res.status(200).json({
      status: "success",
      message: "RainDrop updated successfully",
      data: rainDrop,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Internal error. couldn't update rainDrop ",
      error: error.message,
    });
  }
};

exports.getRainDropById = async (req, res) => {
  const { id } = req.params;
  try {
    const classRoom = await getRainDropByIdService(id);

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

// get Specific RainDrop
exports.getSpecificRainDrop = async (req, res) => {
  const page = +req.query?.page;
  const size = +req.query?.size;
  const fieldName = req.query?.fieldName;
  const fieldValue = req.query?.fieldValue;
  const fieldName2 = req.query?.fieldName2;
  const fieldValue2 = req.query?.fieldValue2;
  const fieldName3 = req.query?.fieldName3;
  const fieldValue3 = req.query?.fieldValue3;

  try {
    let rainDrops = await RainDrop.find({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    })
      .skip(page * size)
      .limit(size);
    const total = await RainDrop.countDocuments({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    });
    res.status(200).json({
      status: "success",
      data: rainDrops,
      total: total,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};
