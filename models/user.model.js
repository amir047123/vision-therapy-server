const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "password is required"],
      unique: [true, "Please provide a unique email"],
    },
    img: {
      type: String,
      default: "",
    },
    name: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    accountType: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },

    password: {
      type: String,
      required: [true, "password is required"],
    },

    confirmPassword: {
      type: String,
    },
    role: {
      type: String,
      default: "doctor",
    },
    isEmailVerified: {
      type: Boolean,
      default: true,
    },

    forgetPasswordToken: {
      type: String,
      default: "",
    },
    phone: {
      type: Number,
    },

    status: {
      type: String,
      default: "Active",
    },

    oneDay: {
      type: Number,
    },
    oneDayToggle: {
      type: Boolean,
      default: false,
    },
    anaglyphCost: {
      type: Number,
    },

    oneMonth: {
      type: Number,
    },
    oneMonthToggle: {
      type: Boolean,
      default: false,
    },
    threeMonth: {
      type: Number,
    },
    threeMonthToggle: {
      type: Boolean,
      default: false,
    },
    sixMonth: {
      type: Number,
    },
    sixMonthToggle: {
      type: Boolean,
      default: false,
    },
    referralId: {
      type: String,
      ref: "User", // Assuming you're using the same User model for both doctors and patients
    },
    referralName: {
      type: String,
      default: null,
    },
    referralEmail: {
      type: String,
      default: null,
    },
    referralPhone: {
      type: Number,
      default: null,
    },
    redOpacity: {
      type: Number,
      default: 100,
    },
    blueOpacity: {
      type: Number,
      default: 100,
    },

    macAddress: Array,
    deviceName: Array,
  },
  { timestamps: true }
);

userSchema.pre("validate", function (next) {
  if (this.email && this.email.length > 0) {
    mongoose.models.User.findOne({ email: this.email }).then((user) => {
      if (user) {
        this.invalidate("This email already exists");
      }
      next();
    });
  } else {
    next();
  }
});

userSchema.pre("save", function (next) {
  const password = this.password;
  const hashedPassword = bcrypt.hashSync(password);
  this.password = hashedPassword;
  next();
});

userSchema.methods.comparePassword = function (password, hash) {
  const isPasswordValid = bcrypt.compareSync(password, hash);
  return isPasswordValid;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
