const WhyMedmyne = require("../models/whyMedmyne.model");

exports.createWhyMedmyneService = async (data) => {
  const whyMedmyne = await WhyMedmyne.create(data);
  return whyMedmyne;
};
exports.deleteWhyMedmyneService = async (id) => {
  const whyMedmyne = await WhyMedmyne.deleteOne({ _id: id });
  return whyMedmyne;
};

exports.updateWhyMedmyneService = async (id, data) => {
  const whyMedmyne = await WhyMedmyne.updateOne({ _id: id }, data);
  return whyMedmyne;
};
exports.getWhyMedmyneByIdService = async (id) => {
  const whyMedmyne = await WhyMedmyne.findOne({ _id: id });
  return whyMedmyne;
};
