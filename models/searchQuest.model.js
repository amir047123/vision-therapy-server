const mongoose = require("mongoose");

const searchQuestSchema = mongoose.Schema(
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

const SearchQuest = mongoose.model("SearchQuest", searchQuestSchema);
module.exports = SearchQuest;
