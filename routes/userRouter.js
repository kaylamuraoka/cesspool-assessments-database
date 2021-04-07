const router = require("express").Router();
const userController = require("../controllers/userController");

router.post("/register", userController.register);

router.post("/activation", userController.activateEmail);

router.post("/login", userController.login);

router.post("/refresh_token", userController.getAccessToken);

router.post("/forgot", userController.forgotPassword);

module.exports = router;
