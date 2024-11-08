const Transaction = require("../models/transaction.model");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(process.env.STRIPE_SK_KEY);
const {
  createTransactionService,
  deleteTransactionService,
  updateTransactionService,
  getTransactionByIdService,
} = require("../services/transaction.service");
// for property post
exports.createTransaction = async (req, res) => {
  const { token, price, doctorData, doctorId, package } = req.body;
  const newPrice = price * 100;
  try {
    // for payment
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const payment = await stripe.charges.create(
      {
        amount: newPrice,
        currency: "BDT",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );
    // for payment
    if (payment) {
      const newTransaction = await createTransactionService({
        doctorData,
        doctorId,
        package: package,
        amount: price,
        shippingAddress: {
          street: token.card.address_line1,
          city: token.card.address_city,
          country: token.card.address_country,
          pinCode: token.card.address_zip,
        },
        transactionId: payment.source.id,
      });
      res.status(200).json({
        status: "success",
        message: "data inserted successfully!",
        data: newTransaction,
      });
    } else {
      res.status(400).json({
        status: "fail",
        message: "payment fail",
        error: err.message,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// get Transaction
exports.getTransaction = async (req, res) => {
  try {
    let transaction = await Transaction.find({});
    res.status(200).json({
      status: "success",
      data: transaction,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// delete Transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const id = req.params.id;
    const classRoom = await deleteTransactionService(id);
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

// update Transaction
exports.updateTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await updateTransactionService(id, req.body);

    if (!transaction.modifiedCount) {
      return res.status(400).json({
        status: "fail",
        message: "couldn't update",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Transaction updated successfully",
      data: transaction,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Internal error. couldn't update transaction ",
      error: error.message,
    });
  }
};

exports.getTransactionById = async (req, res) => {
  const { id } = req.params;
  try {
    const classRoom = await getTransactionByIdService(id);

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

// get Specific Transaction
exports.getSpecificTransaction = async (req, res) => {
  const page = +req.query?.page;
  const size = +req.query?.size;
  const fieldName = req.query?.fieldName;
  const fieldValue = req.query?.fieldValue;
  const fieldName2 = req.query?.fieldName2;
  const fieldValue2 = req.query?.fieldValue2;
  const fieldName3 = req.query?.fieldName3;
  const fieldValue3 = req.query?.fieldValue3;

  try {
    let transactions = await Transaction.find({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    })
      .skip(page * size)
      .limit(size);
    const total = await Transaction.countDocuments({
      $and: [
        { [fieldName]: { $eq: fieldValue } },
        { [fieldName2]: { $eq: fieldValue2 } },
        { [fieldName3]: { $eq: fieldValue3 } },
      ],
    });
    res.status(200).json({
      status: "success",
      data: transactions,
      total: total,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};
