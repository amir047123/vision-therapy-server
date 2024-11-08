const Package = require("../models/package.models");
const User = require("../models/user.model");
var ObjectID = require("mongodb").ObjectId;

// for paymentMethod
const SSLCommerzPayment = require("sslcommerz-lts");
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASS;
const is_live = false;
const tran_id = new ObjectID().toString();
// for paymentMethod

const {
  createPackageService,
  deletePackageService,
  updatePackageService,
  getPackageByIdService,
} = require("../services/package.service");
// for property post
exports.createPackage = async (req, res) => {
  const package = req.body;
  const data = {
    total_amount: package?.packagePrice,
    currency: "BDT",
    tran_id: tran_id, // use unique tran_id for each api call
    success_url: `http://localhost:5000/api/v1/package/payment/success/${tran_id}`,
    fail_url: `http://localhost:5000/api/v1/package/payment/fail/${tran_id}`,
    cancel_url: `http://localhost:5000/api/v1/package/payment/cancel/${tran_id}`,
    ipn_url: "http://localhost:3030/ipn",
    shipping_method: "Courier",
    product_name: package?.packageName,
    product_category: "Electronic",
    product_profile: "general",
    cus_name: package?.userName,
    cus_email: package?.userEmail,
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  sslcz.init(data).then((apiResponse) => {
    // Redirect the user to payment gateway
    let GatewayPageURL = apiResponse.GatewayPageURL;
    res.send({ url: GatewayPageURL });
  });

  // post transaction on database

  try {
    const pack = await Package.findOne({ userId: package?.userId });
    if (pack) {
      await Package.updateOne(
        { _id: pack?._id },
        { ...package, tran_id: tran_id }
      );
    } else {
      await createPackageService({ ...req.body, tran_id: tran_id });
    }
  } catch (err) {}
};

// get Package
exports.getPackage = async (req, res) => {
  try {
    let package = await Package.find({});
    res.status(200).json({
      status: "success",
      data: package,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// delete Package
exports.deletePackage = async (req, res) => {
  try {
    const id = req.params.id;
    const classRoom = await deletePackageService(id);
    res.status(200).json({
      status: "success",
      data: classRoom,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

// update Package
exports.updatePackage = async (req, res) => {
  const { id } = req.params;
  try {
    const package = await updatePackageService(id, req.body);

    if (!package.modifiedCount) {
      return res.status(400).json({
        status: "fail",
        message: "couldn't update",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Package updated successfully",
      data: package,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Internal error. couldn't update package ",
      error: error.message,
    });
  }
};

exports.getPackageById = async (req, res) => {
  const { id } = req.params;
  try {
    const classRoom = await getPackageByIdService(id);

    res.status(200).json({
      status: "success",
      data: classRoom,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "internal error",
      error: error.message,
    });
  }
};

// get Specific Package
exports.getSpecificPackage = async (req, res) => {
  const page = +req.query?.page;
  const size = +req.query?.size;
  const fieldName = req.query?.fieldName;
  const fieldValue = req.query?.fieldValue;
  const fieldName2 = req.query?.fieldName2;
  const fieldValue2 = req.query?.fieldValue2;
  const fieldName3 = req.query?.fieldName3;
  const fieldValue3 = req.query?.fieldValue3;

  try {
    let packages = await Package.find({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    })
      .skip(page * size)
      .limit(size);
    const total = await Package.countDocuments({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    });
    res.status(200).json({
      status: "success",
      data: packages,
      total: total,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// payment

exports.paymentSuccess = async (req, res) => {
  const tran_id = req.params.tran_id;
  // const package = await Package.findOne({ tran_id: tran_id })
  res.redirect(`http://localhost:5173/payment/success/${tran_id}`);
};

exports.paymentFail = async (req, res) => {
  const tran_id = req.params.tran_id;
  // const package = await Package.findOne({ tran_id: tran_id });
  const result = await Package.deleteOne({ tran_id: tran_id });

  if (result.deletedCount) {
    res.redirect(`http://localhost:5173/payment/fail/${tran_id}`);
  }
};

exports.paymentCancel = async (req, res) => {
  const tran_id = req.params.tran_id;
  // const package = await Package.findOne({ tran_id: tran_id });
  const result = await Package.deleteOne({ tran_id: tran_id });

  res.redirect(`http://localhost:5173/payment/Cancel/${tran_id}`);
};
