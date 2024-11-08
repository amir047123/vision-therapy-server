const Footer = require("../models/footer.model");

exports.createFooterService = async (data) => {
  const footer = await Footer.create(data);
  return footer;
};
exports.deleteFooterService = async (id) => {
  const footer = await Footer.deleteOne({ _id: id });
  return footer;
};

exports.updateFooterService = async (id, data) => {
  const footer = await Footer.updateOne({ _id: id }, data);
  return footer;
};
exports.getFooterByIdService = async (id) => {
  const footer = await Footer.findOne({ _id: id });
  return footer;
};
