const RainDrop = require("../models/rainDrop.model");

exports.createRainDropService = async (data) => {
  const rainDrop = await RainDrop.create(data);
  return rainDrop;
};
exports.deleteRainDropService = async (id) => {
  const rainDrop = await RainDrop.deleteOne({ _id: id });
  return rainDrop;
};

exports.updateRainDropService = async (id, data) => {
  const rainDrop = await RainDrop.updateOne({ _id: id }, data);
  return rainDrop;
};
exports.getRainDropByIdService = async (id) => {
  const rainDrop = await RainDrop.findOne({ _id: id });
  return rainDrop;
};
