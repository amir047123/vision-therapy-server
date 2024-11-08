const WhyMedmyne = require("../models/whyMedmyne.model");
const {
  createWhyMedmyneService,
  deleteWhyMedmyneService,
  updateWhyMedmyneService,
  getWhyMedmyneByIdService,
} = require("../services/whyMedmyne.service");
// for property post
exports.createWhyMedmyne = async (req, res) => {
  console.log(req.body);
  try {
    const newWhyMedmyne = await createWhyMedmyneService(req.body);
    res.status(200).json({
      status: "success",
      message: "data inserted successfully!",
      data: newWhyMedmyne,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// get WhyMedmyne
exports.getWhyMedmyne = async (req, res) => {
  try {
    let whyMedmyne = await WhyMedmyne.find({});
    res.status(200).json({
      status: "success",
      data: whyMedmyne,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// delete WhyMedmyne
exports.deleteWhyMedmyne = async (req, res) => {
  try {
    const id = req.params.id;
    const classRoom = await deleteWhyMedmyneService(id);
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

// update WhyMedmyne
exports.updateWhyMedmyne = async (req, res) => {
  const { id } = req.params;
  try {
    const whyMedmyne = await updateWhyMedmyneService(id, req.body);

    if (!whyMedmyne.modifiedCount) {
      return res.status(400).json({
        status: "fail",
        message: "couldn't update",
      });
    }
    res.status(200).json({
      status: "success",
      message: "WhyMedmyne updated successfully",
      data: whyMedmyne,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Internal error. couldn't update whyMedmyne ",
      error: error.message,
    });
  }
};

exports.getWhyMedmyneById = async (req, res) => {
  const { id } = req.params;
  try {
    const classRoom = await getWhyMedmyneByIdService(id);

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

// get Specific WhyMedmyne
exports.getSpecificWhyMedmyne = async (req, res) => {
  const page = +req.query?.page;
  const size = +req.query?.size;
  const fieldName = req.query?.fieldName;
  const fieldValue = req.query?.fieldValue;
  const fieldName2 = req.query?.fieldName2;
  const fieldValue2 = req.query?.fieldValue2;
  const fieldName3 = req.query?.fieldName3;
  const fieldValue3 = req.query?.fieldValue3;

  try {
    let whyMedmynes = await WhyMedmyne.find({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    })
      .skip(page * size)
      .limit(size);
    const total = await WhyMedmyne.countDocuments({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    });
    res.status(200).json({
      status: "success",
      data: whyMedmynes,
      total: total,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};
