const mongoose = require("mongoose");

const growSchema = mongoose.Schema(
  {
    sectionName: { type: String, default: "Grow Section" },
    title: { type: String },
    content: { type: String },
    img: { type: String },
  },

  { timestamps: true }
);

const Grow = mongoose.model("Grow", growSchema);
module.exports = Grow;
