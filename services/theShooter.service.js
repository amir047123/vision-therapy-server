const TheShooter = require("../models/theShooter.model");

exports.createTheShooterService = async (data) => {
  const theShooter = await TheShooter.create(data);
  return theShooter;
};
exports.deleteTheShooterService = async (id) => {
  const theShooter = await TheShooter.deleteOne({ _id: id });
  return theShooter;
};

exports.updateTheShooterService = async (id, data) => {
  const theShooter = await TheShooter.updateOne({ _id: id }, data);
  return theShooter;
};
exports.getTheShooterByIdService = async (id) => {
  const theShooter = await TheShooter.findOne({ _id: id });
  return theShooter;
};
