const MatchGabor = require("../models/matchGabor.model");
const {
  createMatchGaborService,
  deleteMatchGaborService,
  updateMatchGaborService,
  getMatchGaborByIdService,
} = require("../services/matchGabor.service");
// for property post
exports.createMatchGabor = async (req, res) => {
  console.log(req.body);
  try {
    const newMatchGabor = await createMatchGaborService(req.body);
    res.status(200).json({
      status: "success",
      message: "data inserted successfully!",
      data: newMatchGabor,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// get MatchGabor
exports.getMatchGabor = async (req, res) => {
  try {
    let classRoom = await MatchGabor.find({});
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

// delete MatchGabor
exports.deleteMatchGabor = async (req, res) => {
  try {
    const id = req.params.id;
    const classRoom = await deleteMatchGaborService(id);
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

// update MatchGabor
exports.updateMatchGabor = async (req, res) => {
  const { id } = req.params;
  try {
    const matchGabor = await updateMatchGaborService(id, req.body);

    if (!matchGabor.modifiedCount) {
      return res.status(400).json({
        status: "fail",
        message: "couldn't update",
      });
    }
    res.status(200).json({
      status: "success",
      message: "MatchGabor updated successfully",
      data: matchGabor,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Internal error. couldn't update matchGabor ",
      error: error.message,
    });
  }
};

exports.getMatchGaborById = async (req, res) => {
  const { id } = req.params;
  try {
    const classRoom = await getMatchGaborByIdService(id);

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

// get Specific MatchGabor
exports.getSpecificMatchGabor = async (req, res) => {
  const page = +req.query?.page;
  const size = +req.query?.size;
  const fieldName = req.query?.fieldName;
  const fieldValue = req.query?.fieldValue;
  const fieldName2 = req.query?.fieldName2;
  const fieldValue2 = req.query?.fieldValue2;
  const fieldName3 = req.query?.fieldName3;
  const fieldValue3 = req.query?.fieldValue3;

  try {
    let matchGabors = await MatchGabor.find({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    })
      .skip(page * size)
      .limit(size);
    const total = await MatchGabor.countDocuments({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    });
    res.status(200).json({
      status: "success",
      data: matchGabors,
      total: total,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};
