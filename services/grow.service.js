const Grow = require("../models/grow.model");

exports.createGrowService = async (data) => {
  const grow = await Grow.create(data);
  return grow;
};
exports.deleteGrowService = async (id) => {
  const grow = await Grow.deleteOne({ _id: id });
  return grow;
};

exports.updateGrowService = async (id, data) => {
  const grow = await Grow.updateOne({ _id: id }, data);
  return grow;
};
exports.getGrowByIdService = async (id) => {
  const grow = await Grow.findOne({ _id: id });
  return grow;
};
