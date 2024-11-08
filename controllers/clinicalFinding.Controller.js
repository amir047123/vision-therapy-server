const ClinicalFinding = require("../models/ClinicalFinding");

// Get all entries
exports.getAll = async (req, res) => {
  try {
    const findings = await ClinicalFinding.find();
    res.json(findings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific entry by ID
exports.getOne = async (req, res) => {
  try {
    const finding = await ClinicalFinding.findById(req.params.id);
    if (finding == null) {
      return res.status(404).json({ message: "Cannot find finding" });
    }
    res.json(finding);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new entry
// Create a new entry
exports.createOne = async (req, res) => {
  const finding = new ClinicalFinding({
    userId: req.body.userId,
    userName: req.body.userName,
    userEmail: req.body.userEmail,
    date: req.body.date,
    eyeType: req.body.eyeType,
    leftEye: req.body.leftEye,
    rightEye: req.body.rightEye,
  });

  try {
    const newFinding = await finding.save();
    res.status(201).json(newFinding);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an entry by ID (full update)
exports.updateOne = async (req, res) => {
  try {
    const updatedFinding = await ClinicalFinding.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedFinding);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Partially update an entry by ID
exports.patchOne = async (req, res) => {
  try {
    const finding = await ClinicalFinding.findById(req.params.id);
    if (finding == null) {
      return res.status(404).json({ message: "Cannot find finding" });
    }

    for (let key in req.body) {
      finding[key] = req.body[key];
    }

    const updatedFinding = await finding.save();
    res.json(updatedFinding);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an entry by ID
exports.deleteOne = async (req, res) => {
  try {
    const deletedFinding = await ClinicalFinding.findByIdAndRemove(
      req.params.id
    );
    if (!deletedFinding) {
      return res.status(404).json({ message: "Finding not found" });
    }
    res.json({ message: "Deleted Clinical Finding" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSpecific = async (req, res) => {
  const fieldName = req.query?.fieldName;
  const fieldValue = req.query?.fieldValue;
  const fieldName2 = req.query?.fieldName2;
  const fieldValue2 = req.query?.fieldValue2;

  try {
    let clinicalFinding = await ClinicalFinding.find({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
      ],
    });

    res.status(200).json({
      status: "success",
      data: clinicalFinding,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};
