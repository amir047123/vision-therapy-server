const RandomObstacle = require("../models/randomObstacle.model");

exports.createRandomObstacleService = async (data) => {
  const randomObstacle = await RandomObstacle.create(data);
  return randomObstacle;
};
exports.deleteRandomObstacleService = async (id) => {
  const randomObstacle = await RandomObstacle.deleteOne({ _id: id });
  return randomObstacle;
};

exports.updateRandomObstacleService = async (id, data) => {
  const randomObstacle = await RandomObstacle.updateOne({ _id: id }, data);
  return randomObstacle;
};
exports.getRandomObstacleByIdService = async (id) => {
  const randomObstacle = await RandomObstacle.findOne({ _id: id });
  return randomObstacle;
};
