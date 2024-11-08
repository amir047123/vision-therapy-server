const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const os = require("os");

const {
  createSignUpService,
  getUserService,
  getUserByIdService,
  deleteUserService,
  updateUserService,
  findUserByEmail,
  getUserByEmailService,
} = require("../services/user.service");
const {
  checkWithIdService,
  checkWithEmailService,
} = require("../utils/checkWithId");
const { generateToken } = require("../utils/token");
const signUpEmailSender = require("../utils/signUpEmailSender");
const sendEmail = require("../utils/emailSender");

const sendSignUpMail = async (name, email, password) => {
  try {
    await signUpEmailSender(name, email, password, (ret) => {
      if (ret === "sent") {
        res.status(200).json({
          status: "success",
          message: "User credential send on their email",
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.singUp = async (req, res, next) => {
  try {
    const user = await createSignUpService(req.body);

    const userip = new User({
      macAddress: [],
      deviceName: [],
    });

    userip
      .save()
      .then((doc) => {
        // Document saved successfully
      })
      .catch((err) => {
        // console.error(err);
      });

    // token genarate
    const validateToken = jwt.sign(
      { _id: user._id },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "12h",
      }
    );

    if (user) {
      sendSignUpMail(user?.name, user?.email, req?.body?.password);
    }

    res.status(200).json({
      status: "success",
      data: user,
      message: "successfully signup",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { id } = req.query;
    const query = { _id: id };
    const result = await User.findOne(query);
    const updateUser = {
      $set: {
        isEmailVerified: true,
      },
    };
    const user = await User.updateOne(query, updateUser);
    res.send(user);
  } catch {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

exports.logIn = async (req, res, next) => {
  try {
    const hostname = os.hostname();
    const userIp = req.ip;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        status: "fail",
        message: "Please provide your credential",
      });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "No user Found. Please Create an account",
      });
    }
    const isPasswordValid = user.comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(403).json({
        status: "fail",
        message: "email or password are not correct",
      });
    }

    if (!user?.isActive) {
      return res.status(403).json({
        status: "fail",
        message: "Your account is no longer active !",
      });
    }

    const { password: pwd, ...others } = user.toObject();

    const filter = { _id: user?._id };
    if (user?.macAddress) {
      const setHostName = {
        $push: {
          deviceName: hostname,
        },
      };
      const setUserIp = {
        $push: {
          macAddress: userIp,
        },
      };

      const updateUserWithMacAddress = await User.updateOne(filter, setUserIp);
      const updateUserWithHostName = await User.updateOne(filter, setHostName);
      //create jwt token
      // const token = generateToken(user);
      const token = jwt.sign(email, process.env.SECRET_KEY);
      res.status(200).json({
        status: "success",
        message: "successfully logged in",
        token:token,
        data: {
          token,
          user: others,
          userIp,
          updateUserWithMacAddress,
          data: user,
        },
      });
    } else {
      res.status(400).json({
        status: "fail",
        message: "Device limit exceeded",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await findUserByEmail(req?.user?.email);

    const { password, ...others } = user.toObject();

    res.status(200).json({
      status: "success",
      data: {
        data: others,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: error,
    });
  }
};

// ---------get users--------

exports.getUsers = async (req, res) => {
  try {
    const page = +req.query?.page;
    const size = +req.query?.size;
    const filter = req.query?.filter;

    const data = await getUserService(page, size, filter);

    res.status(200).json({
      status: "success",
      data: data.result,
      total: data.total,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "internal error",
      error: error.message,
    });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const isIdAvaiable = await checkWithIdService(id, User);
    if (!isIdAvaiable) {
      return res.status(400).json({
        status: "fail",
        message: "couldn't find user",
      });
    }

    const user = await getUserByIdService(id);

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "internal error",
      error: error.message,
    });
  }
};
exports.getUserByQuery = async (req, res) => {
  const { email } = req.query;
  console.log(email);

  try {
    const isIdAvaiable = await checkWithEmailService(email);
    if (!isIdAvaiable) {
      return res.status(400).json({
        status: "fail",
        message: "couldn't find user",
      });
    }

    const user = await getUserByEmailService(email);

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "internal error",
      error: error.message,
    });
  }
};
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const isIdAvaiable = await checkWithIdService(id, User);
    if (!isIdAvaiable) {
      return res.status(400).json({
        status: "fail",
        message: "couldn't delete user",
      });
    }

    const result = await deleteUserService(id);

    res.status(200).json({
      status: "success",
      message: "user deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "internal error. couldn't delete user ",
      error: error.message,
    });
  }
};

const sendResetPasswordMail = async (name, email, token) => {
  try {
    let url = `Your Password reset code : ${token}`;
    await sendEmail(email, "resetPassword", { url }, (ret) => {
      if (ret === "sent") {
        res
          .status(200)
          .json({ status: "success", message: "Password reset otp send!" });
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

//reset password
exports.resetPassword = async (req, res) => {
  const { id } = req.params;

  try {
    const isIdAvaiable = await checkWithIdService(id, User);
    if (!isIdAvaiable) {
      return res.status(400).json({
        status: "fail",
        message: "No such account",
      });
    }

    const newPassword = req.body.password;

    const hashedPassword = bcrypt.hashSync(newPassword);

    const result = await updateUserService(id, { password: hashedPassword });

    if (!result.modifiedCount) {
      return res.status(400).json({
        status: "fail",
        message: "Password not changed.",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Password Changed Successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Internal error. couldn't reset password ",
      error: error.message,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const userData = await User.findOne({ email });

    if (!userData) {
      return res.status(400).json({
        status: "fail",
        message: "This Email does not Exists.",
      });
    }

    if (userData?.role !== "superAdmin") {
      return res.status(400).json({
        status: "fail",
        message: "Only SuperAdmin Can Forget Password",
      });
    }
    const randomString = Math.floor(Math.random() * 10000 + 1);
    const data = await User.updateOne(
      { email },
      { forgetPasswordToken: randomString }
    );
    sendResetPasswordMail(userData.name, userData.email, randomString);

    res.status(200).json({
      status: "success",
      message: "check your email inbox",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};
exports.getUserIp = async (req, res) => {
  const ipAddress = req.ip;
  res.send(ipAddress);
  return ipAddress;
};

//delete user ip
exports.deleteUserIp = async (req, res) => {
  const { id } = req.params;
  try {
    const isIdAvaiable = await checkWithIdService(id, User);
    if (!isIdAvaiable) {
      return res.status(400).json({
        status: "fail",
        message: "couldn't delete user",
      });
    }
    const user = await getUserByIdService(id);

    console.log(user);
    const result = await User.updateOne(
      { _id: id },
      { $pull: { macAddress: { $eq: user?.macAddress[0] } } }
    );
    console.log(result);
    res.send(result);
  } catch {
    res.status(400).json({
      status: "fail",
      message: "Internal error. couldn't update user ",
    });
  }
};

// get Specific User
exports.getSpecificUser = async (req, res) => {
  const page = +req.query?.page;
  const size = +req.query?.size;
  const fieldName = req.query?.fieldName;
  const fieldValue = req.query?.fieldValue;
  const fieldName2 = req.query?.fieldName2;
  const fieldValue2 = req.query?.fieldValue2;

  try {
    let users = await User.find({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
      ],
    })
      .skip(page * size)
      .limit(size);
    const total = await User.countDocuments({
      [fieldName]: { $eq: fieldValue },
    });
    res.status(200).json({
      status: "success",
      data: users,
      total: total,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const isIdAvailable = await checkWithIdService(id, User);
    if (!isIdAvailable) {
      return res.status(400).json({
        status: "fail",
        message: "No such account",
      });
    }

    const result = await updateUserService(id, req.body);

    if (!result.modifiedCount) {
      return res.status(400).json({
        status: "fail",
        message: "Couldn't update",
      });
    }
    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Internal error. Couldn't update user ",
      error: error.message,
    });
  }
};

exports.changePassword = async (req, res) => {
  const { id } = req.params;
  const oldPassword = req.body?.oldPassword;
  const newPassword = req.body?.newPassword;
  const email = req.body?.email;
  try {
    if (!email || !oldPassword) {
      return res.status(401).json({
        status: "fail",
        message: "Please provide your credential",
      });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "No user Found. Please Create an account",
      });
    }

    const isPasswordValid = user.comparePassword(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({
        status: "fail",
        message: "Old password are not correct",
      });
    }

    const hashedPassword = bcrypt.hashSync(newPassword);
    const result = await updateUserService(id, { password: hashedPassword });

    if (!result.modifiedCount) {
      return res.status(400).json({
        status: "fail",
        message: "Password not changed.",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Password Changed Successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Internal error. couldn't reset password ",
      error: error.message,
    });
  }
};
