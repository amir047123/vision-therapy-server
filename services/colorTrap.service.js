const ColorTrap = require("../models/colorTrap.model");

exports.createColorTrapService = async (data) => {
  const colorTrap = await ColorTrap.create(data);
  return colorTrap;
};
exports.deleteColorTrapService = async (id) => {
  const colorTrap = await ColorTrap.deleteOne({ _id: id });
  return colorTrap;
};

exports.updateColorTrapService = async (id, data) => {
  const colorTrap = await ColorTrap.updateOne({ _id: id }, data);
  return colorTrap;
};
exports.getColorTrapByIdService = async (id) => {
  const colorTrap = await ColorTrap.findOne({ _id: id });
  return colorTrap;
};
