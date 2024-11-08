const SmoothMovement = require("../models/smoothMovement.models");

exports.createSmoothMovementService = async (data) => {
  const smoothMovement = await SmoothMovement.create(data);
  return smoothMovement;
};
exports.deleteSmoothMovementService = async (id) => {
  const smoothMovement = await SmoothMovement.deleteOne({ _id: id });
  return smoothMovement;
};

exports.updateSmoothMovementService = async (id, data) => {
  const smoothMovement = await SmoothMovement.updateOne({ _id: id }, data);
  return smoothMovement;
};
exports.getSmoothMovementByIdService = async (id) => {
  const smoothMovement = await SmoothMovement.findOne({ _id: id });
  return smoothMovement;
};
