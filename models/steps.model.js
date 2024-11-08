const mongoose = require("mongoose");

const stepsSchema = mongoose.Schema(
  {
    sectionName: { type: String, default: "Steps Section" },
    title: { type: String },
    description: { type: String },

    firstStepsTitle: { type: String },
    firstStepsDes: { type: String },

    secondStepsTitle: { type: String },
    secondStepsDes: { type: String },

    thirdStepsTitle: { type: String },
    thirdStepsDes: { type: String },
  },

  { timestamps: true }
);

const Steps = mongoose.model("Steps", stepsSchema);
module.exports = Steps;
