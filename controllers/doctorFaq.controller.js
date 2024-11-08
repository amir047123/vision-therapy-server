const DoctorFaq = require("../models/doctorFaq.model");
const {
  createDoctorFaqService,
  deleteDoctorFaqService,
  updateDoctorFaqService,
  getDoctorFaqByIdService,
} = require("../services/doctorFaq.service");
// for property post
exports.createDoctorFaq = async (req, res) => {
  console.log(req.body);
  try {
    const newDoctorFaq = await createDoctorFaqService(req.body);
    res.status(200).json({
      status: "success",
      message: "data inserted successfully!",
      data: newDoctorFaq,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// get DoctorFaq
exports.getDoctorFaq = async (req, res) => {
  try {
    let doctorFaq = await DoctorFaq.find({});
    res.status(200).json({
      status: "success",
      data: doctorFaq,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// delete DoctorFaq
exports.deleteDoctorFaq = async (req, res) => {
  try {
    const id = req.params.id;
    const classRoom = await deleteDoctorFaqService(id);
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

// update DoctorFaq
exports.updateDoctorFaq = async (req, res) => {
  const { id } = req.params;
  try {
    const doctorFaq = await updateDoctorFaqService(id, req.body);

    if (!doctorFaq.modifiedCount) {
      return res.status(400).json({
        status: "fail",
        message: "couldn't update",
      });
    }
    res.status(200).json({
      status: "success",
      message: "DoctorFaq updated successfully",
      data: doctorFaq,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Internal error. couldn't update doctorFaq ",
      error: error.message,
    });
  }
};

exports.getDoctorFaqById = async (req, res) => {
  const { id } = req.params;
  try {
    const classRoom = await getDoctorFaqByIdService(id);

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

// get Specific DoctorFaq
exports.getSpecificDoctorFaq = async (req, res) => {
  const page = +req.query?.page;
  const size = +req.query?.size;
  const fieldName = req.query?.fieldName;
  const fieldValue = req.query?.fieldValue;
  const fieldName2 = req.query?.fieldName2;
  const fieldValue2 = req.query?.fieldValue2;
  const fieldName3 = req.query?.fieldName3;
  const fieldValue3 = req.query?.fieldValue3;

  try {
    let doctorFaqs = await DoctorFaq.find({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    })
      .skip(page * size)
      .limit(size);
    const total = await DoctorFaq.countDocuments({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    });
    res.status(200).json({
      status: "success",
      data: doctorFaqs,
      total: total,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};
