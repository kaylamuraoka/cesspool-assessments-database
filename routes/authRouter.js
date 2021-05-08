const router = require("express").Router();
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

router.post("/register", authController.register);

router.post("/activate", authController.activateAccount);

router.post("/login", authController.login);

router.post("/refresh_token", authController.generateAccessToken);

router.post("/forgot_password", authController.forgotPassword);

router.post("/reset_password", auth, authController.resetPassword);

router.post("/logout", authController.logout);

module.exports = router;
