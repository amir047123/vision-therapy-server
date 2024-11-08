const RockChart = require("../models/rockChart.model");
const {
  createRockChartService,
  deleteRockChartService,
  updateRockChartService,
  getRockChartByIdService,
} = require("../services/rockChart.service");
// for property post
exports.createRockChart = async (req, res) => {
  console.log(req.body);
  try {
    const newRockChart = await createRockChartService(req.body);
    res.status(200).json({
      status: "success",
      message: "data inserted successfully!",
      data: newRockChart,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// get RockChart
exports.getRockChart = async (req, res) => {
  try {
    let classRoom = await RockChart.find({});
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

// delete RockChart
exports.deleteRockChart = async (req, res) => {
  try {
    const id = req.params.id;
    const classRoom = await deleteRockChartService(id);
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

// update RockChart
exports.updateRockChart = async (req, res) => {
  const { id } = req.params;
  try {
    const rockChart = await updateRockChartService(id, req.body);

    if (!rockChart.modifiedCount) {
      return res.status(400).json({
        status: "fail",
        message: "couldn't update",
      });
    }
    res.status(200).json({
      status: "success",
      message: "RockChart updated successfully",
      data: rockChart,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Internal error. couldn't update rockChart ",
      error: error.message,
    });
  }
};

exports.getRockChartById = async (req, res) => {
  const { id } = req.params;
  try {
    const classRoom = await getRockChartByIdService(id);

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

// get Specific RockChart
exports.getSpecificRockChart = async (req, res) => {
  const page = +req.query?.page;
  const size = +req.query?.size;
  const fieldName = req.query?.fieldName;
  const fieldValue = req.query?.fieldValue;
  const fieldName2 = req.query?.fieldName2;
  const fieldValue2 = req.query?.fieldValue2;
  const fieldName3 = req.query?.fieldName3;
  const fieldValue3 = req.query?.fieldValue3;

  try {
    let rockCharts = await RockChart.find({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    })
      .skip(page * size)
      .limit(size);
    const total = await RockChart.countDocuments({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    });
    res.status(200).json({
      status: "success",
      data: rockCharts,
      total: total,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};
