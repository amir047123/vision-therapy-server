const UserFaq = require("../models/userFaq.model");
const {
  createUserFaqService,
  deleteUserFaqService,
  updateUserFaqService,
  getUserFaqByIdService,
} = require("../services/userFaq.service");
// for property post
exports.createUserFaq = async (req, res) => {
  console.log(req.body);
  try {
    const newUserFaq = await createUserFaqService(req.body);
    res.status(200).json({
      status: "success",
      message: "data inserted successfully!",
      data: newUserFaq,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// get UserFaq
exports.getUserFaq = async (req, res) => {
  try {
    let userFaq = await UserFaq.find({});
    res.status(200).json({
      status: "success",
      data: userFaq,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// delete UserFaq
exports.deleteUserFaq = async (req, res) => {
  try {
    const id = req.params.id;
    const classRoom = await deleteUserFaqService(id);
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

// update UserFaq
exports.updateUserFaq = async (req, res) => {
  const { id } = req.params;
  try {
    const userFaq = await updateUserFaqService(id, req.body);

    if (!userFaq.modifiedCount) {
      return res.status(400).json({
        status: "fail",
        message: "couldn't update",
      });
    }
    res.status(200).json({
      status: "success",
      message: "UserFaq updated successfully",
      data: userFaq,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Internal error. couldn't update userFaq ",
      error: error.message,
    });
  }
};

exports.getUserFaqById = async (req, res) => {
  const { id } = req.params;
  try {
    const classRoom = await getUserFaqByIdService(id);

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

// get Specific UserFaq
exports.getSpecificUserFaq = async (req, res) => {
  const page = +req.query?.page;
  const size = +req.query?.size;
  const fieldName = req.query?.fieldName;
  const fieldValue = req.query?.fieldValue;
  const fieldName2 = req.query?.fieldName2;
  const fieldValue2 = req.query?.fieldValue2;
  const fieldName3 = req.query?.fieldName3;
  const fieldValue3 = req.query?.fieldValue3;

  try {
    let userFaqs = await UserFaq.find({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    })
      .skip(page * size)
      .limit(size);
    const total = await UserFaq.countDocuments({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    });
    res.status(200).json({
      status: "success",
      data: userFaqs,
      total: total,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};
