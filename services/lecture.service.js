const Lecture = require("../models/lecture.model");

exports.createLectureService = async (data) => {
  const lecture = await Lecture.create(data);
  return lecture;
};
exports.deleteLectureService = async (id) => {
  const lecture = await Lecture.deleteOne({ _id: id });
  return lecture;
};

exports.updateLectureService = async (id, data) => {
  const lecture = await Lecture.updateOne({ _id: id }, data);
  return lecture;
};
exports.getLectureByIdService = async (id) => {
  const lecture = await Lecture.findOne({ _id: id });
  return lecture;
};
