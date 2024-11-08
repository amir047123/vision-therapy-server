const RapidMovement = require("../models/rapidMovement.model");

exports.createRapidMovementService = async (data) => {
  const rapidMovement = await RapidMovement.create(data);
  return rapidMovement;
};
exports.deleteRapidMovementService = async (id) => {
  const rapidMovement = await RapidMovement.deleteOne({ _id: id });
  return rapidMovement;
};

exports.updateRapidMovementService = async (id, data) => {
  const rapidMovement = await RapidMovement.updateOne({ _id: id }, data);
  return rapidMovement;
};
exports.getRapidMovementByIdService = async (id) => {
  const rapidMovement = await RapidMovement.findOne({ _id: id });
  return rapidMovement;
};
