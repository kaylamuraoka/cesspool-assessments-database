const router = require("express").Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.get("/search", auth, userController.searchUser);

router.get("/user/:id", auth, userController.getUserInfo);

router.get("/users/all", auth, userController.getAllUsersInfo);

router.patch("/user", auth, userController.updateUser);

router.delete("/delete_account", auth, userController.deleteAccount);

router.patch("/user/:id/follow", auth, userController.follow);

router.patch("/user/:id/unfollow", auth, userController.unfollow);

router.get("/suggestionsUser", auth, userController.suggestionsUser);

// Admin only routes
router.patch(
  "/update_role/:id",
  auth,
  authAdmin,
  userController.updateUsersRole
);

router.delete("/delete/:id", auth, authAdmin, userController.adminDeleteUser);

module.exports = router;
