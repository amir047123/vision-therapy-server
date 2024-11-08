const mongoose = require("mongoose");

const researchSchema = mongoose.Schema(
  {
    sectionName: { type: String, default: "Research Section" },

    researchTitle: { type: String },
    research: { type: String },
    researchersName: { type: String },
    importantUrl: { type: String },
    date: { type: Date, default: Date.now },
  },

  { timestamps: true }
);

const Research = mongoose.model("Research", researchSchema);
module.exports = Research;
