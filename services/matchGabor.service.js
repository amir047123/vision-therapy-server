const MatchGabor = require("../models/matchGabor.model");

exports.createMatchGaborService = async (data) => {
  const matchGabor = await MatchGabor.create(data);
  return matchGabor;
};
exports.deleteMatchGaborService = async (id) => {
  const matchGabor = await MatchGabor.deleteOne({ _id: id });
  return matchGabor;
};

exports.updateMatchGaborService = async (id, data) => {
  const matchGabor = await MatchGabor.updateOne({ _id: id }, data);
  return matchGabor;
};
exports.getMatchGaborByIdService = async (id) => {
  const matchGabor = await MatchGabor.findOne({ _id: id });
  return matchGabor;
};
