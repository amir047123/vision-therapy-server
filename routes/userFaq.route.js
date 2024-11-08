const express = require("express");
const {
  createUserFaq,
  getUserFaq,
  deleteUserFaq,
  updateUserFaq,
  getUserFaqById,
  getSpecificUserFaq,
} = require("../controllers/userFaq.controller");
const router = express.Router();

router.post("/addUserFaq", createUserFaq);
router.get("/getUserFaq", getUserFaq);
router.get("/getUserFaqById/:id", getUserFaqById);
router.delete("/deleteUserFaq/:id", deleteUserFaq);
router.route("/updateUserFaq/:id").patch(updateUserFaq);
router.route("/specific").get(getSpecificUserFaq);

module.exports = router;
