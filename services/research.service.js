const Research = require("../models/research.model");

exports.createResearchService = async (data) => {
  const research = await Research.create(data);
  return research;
};
exports.deleteResearchService = async (id) => {
  const research = await Research.deleteOne({ _id: id });
  return research;
};

exports.updateResearchService = async (id, data) => {
  const research = await Research.updateOne({ _id: id }, data);
  return research;
};
exports.getResearchByIdService = async (id) => {
  const research = await Research.findOne({ _id: id });
  return research;
};
