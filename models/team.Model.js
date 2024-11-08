const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
  },
  Name: {
    type: String,
  },
  description: {
    type: String,
  },
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
