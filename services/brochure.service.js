const Brochure = require("../models/brochure.model");

exports.createBrochureService = async (data) => {
  const brochure = await Brochure.create(data);
  return brochure;
};
exports.deleteBrochureService = async (id) => {
  const brochure = await Brochure.deleteOne({ _id: id });
  return brochure;
};

exports.updateBrochureService = async (id, data) => {
  const brochure = await Brochure.updateOne({ _id: id }, data);
  return brochure;
};
exports.getBrochureByIdService = async (id) => {
  const brochure = await Brochure.findOne({ _id: id });
  return brochure;
};
