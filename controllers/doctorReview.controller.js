const DoctorReview = require("../models/doctorReview.model");
const {
  createDoctorReviewService,
  deleteDoctorReviewService,
  updateDoctorReviewService,
  getDoctorReviewByIdService,
} = require("../services/doctorReview.service");
// for property post
exports.createDoctorReview = async (req, res) => {
  console.log(req.body);
  try {
    const newDoctorReview = await createDoctorReviewService(req.body);
    res.status(200).json({
      status: "success",
      message: "data inserted successfully!",
      data: newDoctorReview,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// get DoctorReview
exports.getDoctorReview = async (req, res) => {
  try {
    let doctorReview = await DoctorReview.find({});
    res.status(200).json({
      status: "success",
      data: doctorReview,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// delete DoctorReview
exports.deleteDoctorReview = async (req, res) => {
  try {
    const id = req.params.id;
    const classRoom = await deleteDoctorReviewService(id);
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

// update DoctorReview
exports.updateDoctorReview = async (req, res) => {
  const { id } = req.params;
  try {
    const doctorReview = await updateDoctorReviewService(id, req.body);

    if (!doctorReview.modifiedCount) {
      return res.status(400).json({
        status: "fail",
        message: "couldn't update",
      });
    }
    res.status(200).json({
      status: "success",
      message: "DoctorReview updated successfully",
      data: doctorReview,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Internal error. couldn't update doctorReview ",
      error: error.message,
    });
  }
};

exports.getDoctorReviewById = async (req, res) => {
  const { id } = req.params;
  try {
    const classRoom = await getDoctorReviewByIdService(id);

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

// get Specific DoctorReview
exports.getSpecificDoctorReview = async (req, res) => {
  const page = +req.query?.page;
  const size = +req.query?.size;
  const fieldName = req.query?.fieldName;
  const fieldValue = req.query?.fieldValue;
  const fieldName2 = req.query?.fieldName2;
  const fieldValue2 = req.query?.fieldValue2;
  const fieldName3 = req.query?.fieldName3;
  const fieldValue3 = req.query?.fieldValue3;

  try {
    let doctorReviews = await DoctorReview.find({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    })
      .skip(page * size)
      .limit(size);
    const total = await DoctorReview.countDocuments({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    });
    res.status(200).json({
      status: "success",
      data: doctorReviews,
      total: total,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};
