const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { verifyJwt } = require("../Hooks/verifyJwt");

router.get("/", userController.getUsers);
router.post("/signup", userController.singUp);
router.patch("/verify/user", userController.verifyEmail);
router.post("/login", userController.logIn);
router.get("/me", userController.getMe);
router.post("/forgot-password", userController.forgotPassword);
router.route("/by-email").get(userController.getUserByQuery);
router.post("/delete-ip/:id", userController.deleteUserIp);
router.get("/get-user-ip", userController.getUserIp);
router.patch("/reset-password/:id", userController.resetPassword);
router.get("/specific", userController.getSpecificUser);
router.patch("/:id", userController.updateUser);
router.patch("/change-password/:id", userController.changePassword);

router
  .route("/:id")
  .get(userController.getUserById)
  .delete(userController.deleteUser)
  .patch(userController.updateUser);

module.exports = router;
