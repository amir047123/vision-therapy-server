const Research = require("../models/research.model");
const {
  createResearchService,
  deleteResearchService,
  updateResearchService,
  getResearchByIdService,
} = require("../services/research.service");
// for property post
exports.createResearch = async (req, res) => {
  console.log(req.body);
  try {
    const newResearch = await createResearchService(req.body);
    res.status(200).json({
      status: "success",
      message: "data inserted successfully!",
      data: newResearch,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// get Research
exports.getResearch = async (req, res) => {
  try {
    let research = await Research.find({});
    res.status(200).json({
      status: "success",
      data: research,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// delete Research
exports.deleteResearch = async (req, res) => {
  try {
    const id = req.params.id;
    const classRoom = await deleteResearchService(id);
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

// update Research
exports.updateResearch = async (req, res) => {
  const { id } = req.params;
  try {
    const research = await updateResearchService(id, req.body);

    if (!research.modifiedCount) {
      return res.status(400).json({
        status: "fail",
        message: "couldn't update",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Research updated successfully",
      data: research,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Internal error. couldn't update research ",
      error: error.message,
    });
  }
};

exports.getResearchById = async (req, res) => {
  const { id } = req.params;
  try {
    const classRoom = await getResearchByIdService(id);

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

// get Specific Research
exports.getSpecificResearch = async (req, res) => {
  const page = +req.query?.page;
  const size = +req.query?.size;
  const fieldName = req.query?.fieldName;
  const fieldValue = req.query?.fieldValue;
  const fieldName2 = req.query?.fieldName2;
  const fieldValue2 = req.query?.fieldValue2;
  const fieldName3 = req.query?.fieldName3;
  const fieldValue3 = req.query?.fieldValue3;

  try {
    let researchs = await Research.find({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    })
      .skip(page * size)
      .limit(size);
    const total = await Research.countDocuments({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    });
    res.status(200).json({
      status: "success",
      data: researchs,
      total: total,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};
