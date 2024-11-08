const Footer = require("../models/footer.model");
const {
  createFooterService,
  deleteFooterService,
  updateFooterService,
  getFooterByIdService,
} = require("../services/footer.service");
// for property post
exports.createFooter = async (req, res) => {
  console.log(req.body);
  try {
    const newFooter = await createFooterService(req.body);
    res.status(200).json({
      status: "success",
      message: "data inserted successfully!",
      data: newFooter,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// get Footer
exports.getFooter = async (req, res) => {
  try {
    let footer = await Footer.find({});
    res.status(200).json({
      status: "success",
      data: footer,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// delete Footer
exports.deleteFooter = async (req, res) => {
  try {
    const id = req.params.id;
    const classRoom = await deleteFooterService(id);
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

// update Footer
exports.updateFooter = async (req, res) => {
  const { id } = req.params;
  try {
    const footer = await updateFooterService(id, req.body);

    if (!footer.modifiedCount) {
      return res.status(400).json({
        status: "fail",
        message: "couldn't update",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Footer updated successfully",
      data: footer,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Internal error. couldn't update footer ",
      error: error.message,
    });
  }
};

exports.getFooterById = async (req, res) => {
  const { id } = req.params;
  try {
    const classRoom = await getFooterByIdService(id);

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

// get Specific Footer
exports.getSpecificFooter = async (req, res) => {
  const page = +req.query?.page;
  const size = +req.query?.size;
  const fieldName = req.query?.fieldName;
  const fieldValue = req.query?.fieldValue;
  const fieldName2 = req.query?.fieldName2;
  const fieldValue2 = req.query?.fieldValue2;
  const fieldName3 = req.query?.fieldName3;
  const fieldValue3 = req.query?.fieldValue3;

  try {
    let footers = await Footer.find({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    })
      .skip(page * size)
      .limit(size);
    const total = await Footer.countDocuments({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    });
    res.status(200).json({
      status: "success",
      data: footers,
      total: total,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};
