const Steps = require("../models/steps.model");

exports.createStepsService = async (data) => {
  const steps = await Steps.create(data);
  return steps;
};
exports.deleteStepsService = async (id) => {
  const steps = await Steps.deleteOne({ _id: id });
  return steps;
};

exports.updateStepsService = async (id, data) => {
  const steps = await Steps.updateOne({ _id: id }, data);
  return steps;
};
exports.getStepsByIdService = async (id) => {
  const steps = await Steps.findOne({ _id: id });
  return steps;
};
