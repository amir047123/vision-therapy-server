const RockChart = require("../models/rockChart.model");

exports.createRockChartService = async (data) => {
  const rockChart = await RockChart.create(data);
  return rockChart;
};
exports.deleteRockChartService = async (id) => {
  const rockChart = await RockChart.deleteOne({ _id: id });
  return rockChart;
};

exports.updateRockChartService = async (id, data) => {
  const rockChart = await RockChart.updateOne({ _id: id }, data);
  return rockChart;
};
exports.getRockChartByIdService = async (id) => {
  const rockChart = await RockChart.findOne({ _id: id });
  return rockChart;
};
