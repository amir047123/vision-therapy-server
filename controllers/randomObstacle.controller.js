const RandomObstacle = require("../models/randomObstacle.model");
const {
  createRandomObstacleService,
  deleteRandomObstacleService,
  updateRandomObstacleService,
  getRandomObstacleByIdService,
} = require("../services/randomObstacle.service");
// for property post
exports.createRandomObstacle = async (req, res) => {
  console.log(req.body);
  try {
    const newRandomObstacle = await createRandomObstacleService(req.body);
    res.status(200).json({
      status: "success",
      message: "data inserted successfully!",
      data: newRandomObstacle,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// get RandomObstacle
exports.getRandomObstacle = async (req, res) => {
  try {
    let classRoom = await RandomObstacle.find({});
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

// delete RandomObstacle
exports.deleteRandomObstacle = async (req, res) => {
  try {
    const id = req.params.id;
    const classRoom = await deleteRandomObstacleService(id);
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

// update RandomObstacle
exports.updateRandomObstacle = async (req, res) => {
  const { id } = req.params;
  try {
    const randomObstacle = await updateRandomObstacleService(id, req.body);

    if (!randomObstacle.modifiedCount) {
      return res.status(400).json({
        status: "fail",
        message: "couldn't update",
      });
    }
    res.status(200).json({
      status: "success",
      message: "RandomObstacle updated successfully",
      data: randomObstacle,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Internal error. couldn't update randomObstacle ",
      error: error.message,
    });
  }
};

exports.getRandomObstacleById = async (req, res) => {
  const { id } = req.params;
  try {
    const classRoom = await getRandomObstacleByIdService(id);

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

// get Specific RandomObstacle
exports.getSpecificRandomObstacle = async (req, res) => {
  const page = +req.query?.page;
  const size = +req.query?.size;
  const fieldName = req.query?.fieldName;
  const fieldValue = req.query?.fieldValue;
  const fieldName2 = req.query?.fieldName2;
  const fieldValue2 = req.query?.fieldValue2;
  const fieldName3 = req.query?.fieldName3;
  const fieldValue3 = req.query?.fieldValue3;

  try {
    let randomObstacles = await RandomObstacle.find({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    })
      .skip(page * size)
      .limit(size);
    const total = await RandomObstacle.countDocuments({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    });
    res.status(200).json({
      status: "success",
      data: randomObstacles,
      total: total,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};
