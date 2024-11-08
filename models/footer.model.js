const mongoose = require("mongoose");

const footerSchema = mongoose.Schema(
  {
    sectionName: { type: String, default: "Footer Section" },
    location: { type: String },
    phone: { type: String },
    email: { type: String },
    description: { type: String },
    facebook: { type: String },
    instagram: { type: String },
    linkedin: { type: String },
  },

  { timestamps: true }
);

const Footer = mongoose.model("Footer", footerSchema);
module.exports = Footer;
