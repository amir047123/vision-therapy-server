const mongoose = require("mongoose");

const whyMedmyneSchema = mongoose.Schema(
  {
    sectionName: { type: String, default: "Why is Medmyne" },
    sectionDescription: { type: String },

    firstCardTitle: { type: String },
    firstCardDes: { type: String },

    secondCardTitle: { type: String },
    secondCardDes: { type: String },

    thirdCardTitle: { type: String },
    thirdCardDes: { type: String },

    fourthCardTitle: { type: String },
    fourthCardDes: { type: String },

    fifthCardTitle: { type: String },
    fifthCardDes: { type: String },

    sixthCardTitle: { type: String },
    sixthCardDes: { type: String },
  },
  { timestamps: true }
);

const WhyMedmyne = mongoose.model("WhyMedmyne", whyMedmyneSchema);
module.exports = WhyMedmyne;
