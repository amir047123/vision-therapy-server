const Lecture = require("../models/lecture.model");
const {
  createLectureService,
  deleteLectureService,
  updateLectureService,
  getLectureByIdService,
} = require("../services/lecture.service");
// for property post
exports.createLecture = async (req, res) => {
  console.log(req.body);
  try {
    const newLecture = await createLectureService(req.body);
    res.status(200).json({
      status: "success",
      message: "data inserted successfully!",
      data: newLecture,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// get Lecture
exports.getLecture = async (req, res) => {
  try {
    let lecture = await Lecture.find({});
    res.status(200).json({
      status: "success",
      data: lecture,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// delete Lecture
exports.deleteLecture = async (req, res) => {
  try {
    const id = req.params.id;
    const classRoom = await deleteLectureService(id);
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

// update Lecture
exports.updateLecture = async (req, res) => {
  const { id } = req.params;
  try {
    const lecture = await updateLectureService(id, req.body);

    if (!lecture.modifiedCount) {
      return res.status(400).json({
        status: "fail",
        message: "couldn't update",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Lecture updated successfully",
      data: lecture,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Internal error. couldn't update lecture ",
      error: error.message,
    });
  }
};

exports.getLectureById = async (req, res) => {
  const { id } = req.params;
  try {
    const classRoom = await getLectureByIdService(id);

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

// get Specific Lecture
exports.getSpecificLecture = async (req, res) => {
  const page = +req.query?.page;
  const size = +req.query?.size;
  const fieldName = req.query?.fieldName;
  const fieldValue = req.query?.fieldValue;
  const fieldName2 = req.query?.fieldName2;
  const fieldValue2 = req.query?.fieldValue2;
  const fieldName3 = req.query?.fieldName3;
  const fieldValue3 = req.query?.fieldValue3;

  try {
    let lectures = await Lecture.find({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    })
      .skip(page * size)
      .limit(size);
    const total = await Lecture.countDocuments({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    });
    res.status(200).json({
      status: "success",
      data: lectures,
      total: total,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};
