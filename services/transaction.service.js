const Transaction = require("../models/transaction.model");

exports.createTransactionService = async (data) => {
  const transaction = await Transaction.create(data);
  return transaction;
};
exports.deleteTransactionService = async (id) => {
  const transaction = await Transaction.deleteOne({ _id: id });
  return transaction;
};

exports.updateTransactionService = async (id, data) => {
  const transaction = await Transaction.updateOne({ _id: id }, data);
  return transaction;
};
exports.getTransactionByIdService = async (id) => {
  const transaction = await Transaction.findOne({ _id: id });
  return transaction;
};
