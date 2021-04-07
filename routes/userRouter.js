const router = require("express").Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.post("/register", userController.register);

router.post("/activation", userController.activateEmail);

router.post("/login", userController.login);

router.post("/refresh_token", userController.getAccessToken);

router.post("/forgot_password", userController.forgotPassword);

router.post("/reset_password", auth, userController.resetPassword);

router.get("/info", auth, userController.getUserInfo);

router.delete("/delete_account", auth, userController.deleteAccount);

router.patch("/update", auth, userController.updateUser);

router.get("/logout", userController.logout);

// Admin only routes
router.get("/admin/all_info", auth, authAdmin, userController.getAllUsersInfo);

module.exports = router;
