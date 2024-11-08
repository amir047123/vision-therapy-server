// here import all schema if you need check

const User = require("../models/user.model");

exports.checkWithIdService = async (id, modelName) => {
  const result = await User.findOne({ _id: id });
  if (result?.role) {
    return true;
  } else {
    return false;
  }
};
exports.checkWithEmailService = async (email) => {
  const result = await User.findOne({ email: email });
  console.log("user", email);
  if (result?.role) {
    return true;
  } else {
    return false;
  }
};
