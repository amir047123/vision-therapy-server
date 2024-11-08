const mongoose = require("mongoose");

const lectureSchema = mongoose.Schema(
  {
    sectionName: { type: String, default: "Lecture Section" },

    videoUrl: { type: String },
    videoTitle: { type: String },
    lecturersName: { type: String },
    videoDes: { type: String },
  },

  { timestamps: true }
);

const Lecture = mongoose.model("Lecture", lectureSchema);
module.exports = Lecture;
