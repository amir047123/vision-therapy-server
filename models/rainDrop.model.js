const mongoose = require("mongoose");

const rainDropSchema = mongoose.Schema(
  {
    gameName: { type: String },
    userId: { type: String },
    userName: { type: String },
    score: { type: Number },
    remainingTime: { type: Number },
    date: { type: String },
    time: { type: String },
    possibleScore: { type: Number, default: 300 },
  },
  { timestamps: true }
);

const RainDrop = mongoose.model("RainDrop", rainDropSchema);
module.exports = RainDrop;
