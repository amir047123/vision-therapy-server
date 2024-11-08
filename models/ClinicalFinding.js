const mongoose = require("mongoose");

const clinicalFindingSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  userName: {
    type: String,
  },
  userEmail: {
    type: String,
  },
  date: {
    type: String,
    default: Date.now,
  },
  eyeType: {
    type: String,
  },
  leftEye: {
    sph: Number,
    cyl: Number,
    axis: Number,
    add: Number,
    distance: String,
    logMar1: String,
    near: String,
    logMar2: String,
    clinicalDiagnosis: String,
  },
  rightEye: {
    sph: Number,
    cyl: Number,
    axis: Number,
    add: Number,
    distance: String,
    logMar1: String,
    near: String,
    logMar2: String,
    clinicalDiagnosis: String,
  },
});

module.exports = mongoose.model("ClinicalFinding", clinicalFindingSchema);
