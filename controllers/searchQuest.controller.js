const SearchQuest = require("../models/searchQuest.model");
const {
  createSearchQuestService,
  deleteSearchQuestService,
  updateSearchQuestService,
  getSearchQuestByIdService,
} = require("../services/searchQuest.service");
// for property post
exports.createSearchQuest = async (req, res) => {
  console.log(req.body);
  try {
    const newSearchQuest = await createSearchQuestService(req.body);
    res.status(200).json({
      status: "success",
      message: "data inserted successfully!",
      data: newSearchQuest,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// get SearchQuest
exports.getSearchQuest = async (req, res) => {
  try {
    let classRoom = await SearchQuest.find({});
    res.status(200).json({
      status: "success",
      data: classRoom,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// delete SearchQuest
exports.deleteSearchQuest = async (req, res) => {
  try {
    const id = req.params.id;
    const classRoom = await deleteSearchQuestService(id);
    res.status(200).json({
      status: "success",
      data: classRoom,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

// update SearchQuest
exports.updateSearchQuest = async (req, res) => {
  const { id } = req.params;
  try {
    const searchQuest = await updateSearchQuestService(id, req.body);

    if (!searchQuest.modifiedCount) {
      return res.status(400).json({
        status: "fail",
        message: "couldn't update",
      });
    }
    res.status(200).json({
      status: "success",
      message: "SearchQuest updated successfully",
      data: searchQuest,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Internal error. couldn't update searchQuest ",
      error: error.message,
    });
  }
};

exports.getSearchQuestById = async (req, res) => {
  const { id } = req.params;
  try {
    const classRoom = await getSearchQuestByIdService(id);

    res.status(200).json({
      status: "success",
      data: classRoom,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "internal error",
      error: error.message,
    });
  }
};

// get Specific SearchQuest
exports.getSpecificSearchQuest = async (req, res) => {
  const page = +req.query?.page;
  const size = +req.query?.size;
  const fieldName = req.query?.fieldName;
  const fieldValue = req.query?.fieldValue;
  const fieldName2 = req.query?.fieldName2;
  const fieldValue2 = req.query?.fieldValue2;
  const fieldName3 = req.query?.fieldName3;
  const fieldValue3 = req.query?.fieldValue3;

  try {
    let searchQuests = await SearchQuest.find({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    })
      .skip(page * size)
      .limit(size);
    const total = await SearchQuest.countDocuments({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    });
    res.status(200).json({
      status: "success",
      data: searchQuests,
      total: total,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};
