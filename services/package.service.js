const Package = require("../models/package.models");

exports.createPackageService = async (data) => {
  const package = await Package.create(data);
  return package;
};
exports.deletePackageService = async (id) => {
  const package = await Package.deleteOne({ _id: id });
  return package;
};

exports.updatePackageService = async (id, data) => {
  const package = await Package.updateOne({ _id: id }, data);
  return package;
};
exports.getPackageByIdService = async (id) => {
  const package = await Package.findOne({ _id: id });
  return package;
};
