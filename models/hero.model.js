const mongoose = require("mongoose");

const heroSchema = mongoose.Schema(
  {
    sectionName: { type: String, default: "Hero Section" },
    title: { type: String },
    content: { type: String },
  },
  { timestamps: true }
);

const Hero = mongoose.model("Hero", heroSchema);
module.exports = Hero;
