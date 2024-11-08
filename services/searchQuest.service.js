const SearchQuest = require("../models/searchQuest.model");

exports.createSearchQuestService = async (data) => {
  const searchQuest = await SearchQuest.create(data);
  return searchQuest;
};
exports.deleteSearchQuestService = async (id) => {
  const searchQuest = await SearchQuest.deleteOne({ _id: id });
  return searchQuest;
};

exports.updateSearchQuestService = async (id, data) => {
  const searchQuest = await SearchQuest.updateOne({ _id: id }, data);
  return searchQuest;
};
exports.getSearchQuestByIdService = async (id) => {
  const searchQuest = await SearchQuest.findOne({ _id: id });
  return searchQuest;
};
