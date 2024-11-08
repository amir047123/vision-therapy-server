const express = require("express");
const {
  createTransaction,
  getTransaction,
  deleteTransaction,
  updateTransaction,
  getTransactionById,
  getSpecificTransaction,
} = require("../controllers/transaction.controller");
const router = express.Router();

router.post("/addTransaction", createTransaction);
router.get("/getTransaction", getTransaction);
router.get("/getTransactionById/:id", getTransactionById);
router.delete("/deleteTransaction/:id", deleteTransaction);
router.route("/updateTransaction/:id").patch(updateTransaction);
router.route("/specific").get(getSpecificTransaction);

module.exports = router;
