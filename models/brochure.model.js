const mongoose = require("mongoose");

const brochureSchema = mongoose.Schema(
  {
    sectionName: { type: String, default: "Brochure Section" },

    brochureTitle: { type: String },
    brochure: { type: String },
    writerName: { type: String },
    importantUrl: { type: String },
    date: { type: Date, default: Date.now },
  },

  { timestamps: true }
);

const Brochure = mongoose.model("Brochure", brochureSchema);
module.exports = Brochure;
