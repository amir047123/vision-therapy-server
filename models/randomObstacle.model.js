const mongoose = require("mongoose");

const randomObstacleSchema = mongoose.Schema(
  {
    gameName: { type: String },
    userId: { type: String },
    userName: { type: String },
    score: { type: Number },
    remainingTime: { type: Number },
    date: { type: String },
    time: { type: String },
    possibleScore: { type: Number, default: 15000 },
  },
  { timestamps: true }
);

const RandomObstacle = mongoose.model("RandomObstacle", randomObstacleSchema);
module.exports = RandomObstacle;
