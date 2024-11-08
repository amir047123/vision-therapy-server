const PatientReview = require("../models/patientReview.model");
const {
  createPatientReviewService,
  deletePatientReviewService,
  updatePatientReviewService,
  getPatientReviewByIdService,
} = require("../services/patientReview.service");
// for property post
exports.createPatientReview = async (req, res) => {
  console.log(req.body);
  try {
    const newPatientReview = await createPatientReviewService(req.body);
    res.status(200).json({
      status: "success",
      message: "data inserted successfully!",
      data: newPatientReview,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// get PatientReview
exports.getPatientReview = async (req, res) => {
  try {
    let patientReview = await PatientReview.find({});
    res.status(200).json({
      status: "success",
      data: patientReview,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// delete PatientReview
exports.deletePatientReview = async (req, res) => {
  try {
    const id = req.params.id;
    const classRoom = await deletePatientReviewService(id);
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

// update PatientReview
exports.updatePatientReview = async (req, res) => {
  const { id } = req.params;
  try {
    const patientReview = await updatePatientReviewService(id, req.body);

    if (!patientReview.modifiedCount) {
      return res.status(400).json({
        status: "fail",
        message: "couldn't update",
      });
    }
    res.status(200).json({
      status: "success",
      message: "PatientReview updated successfully",
      data: patientReview,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Internal error. couldn't update patientReview ",
      error: error.message,
    });
  }
};

exports.getPatientReviewById = async (req, res) => {
  const { id } = req.params;
  try {
    const classRoom = await getPatientReviewByIdService(id);

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

// get Specific PatientReview
exports.getSpecificPatientReview = async (req, res) => {
  const page = +req.query?.page;
  const size = +req.query?.size;
  const fieldName = req.query?.fieldName;
  const fieldValue = req.query?.fieldValue;
  const fieldName2 = req.query?.fieldName2;
  const fieldValue2 = req.query?.fieldValue2;
  const fieldName3 = req.query?.fieldName3;
  const fieldValue3 = req.query?.fieldValue3;

  try {
    let patientReviews = await PatientReview.find({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    })
      .skip(page * size)
      .limit(size);
    const total = await PatientReview.countDocuments({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    });
    res.status(200).json({
      status: "success",
      data: patientReviews,
      total: total,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};
