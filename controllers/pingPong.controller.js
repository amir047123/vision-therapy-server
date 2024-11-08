const PingPong = require("../models/pingPong.model");
const {
  createPingPongService,
  deletePingPongService,
  updatePingPongService,
  getPingPongByIdService,
} = require("../services/pingPong.service");
// for property post
exports.createPingPong = async (req, res) => {
  console.log(req.body);
  try {
    const newPingPong = await createPingPongService(req.body);
    res.status(200).json({
      status: "success",
      message: "data inserted successfully!",
      data: newPingPong,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// get PingPong
exports.getPingPong = async (req, res) => {
  try {
    let classRoom = await PingPong.find({});
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

// delete PingPong
exports.deletePingPong = async (req, res) => {
  try {
    const id = req.params.id;
    const classRoom = await deletePingPongService(id);
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

// update PingPong
exports.updatePingPong = async (req, res) => {
  const { id } = req.params;
  try {
    const pingPong = await updatePingPongService(id, req.body);

    if (!pingPong.modifiedCount) {
      return res.status(400).json({
        status: "fail",
        message: "couldn't update",
      });
    }
    res.status(200).json({
      status: "success",
      message: "PingPong updated successfully",
      data: pingPong,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Internal error. couldn't update pingPong ",
      error: error.message,
    });
  }
};

exports.getPingPongById = async (req, res) => {
  const { id } = req.params;
  try {
    const classRoom = await getPingPongByIdService(id);

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

// get Specific PingPong
exports.getSpecificPingPong = async (req, res) => {
  const page = +req.query?.page;
  const size = +req.query?.size;
  const fieldName = req.query?.fieldName;
  const fieldValue = req.query?.fieldValue;
  const fieldName2 = req.query?.fieldName2;
  const fieldValue2 = req.query?.fieldValue2;
  const fieldName3 = req.query?.fieldName3;
  const fieldValue3 = req.query?.fieldValue3;

  try {
    let pingPongs = await PingPong.find({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    })
      .skip(page * size)
      .limit(size);
    const total = await PingPong.countDocuments({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    });
    res.status(200).json({
      status: "success",
      data: pingPongs,
      total: total,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};
