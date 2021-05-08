const router = require("express").Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.get("/search", auth, userController.searchUser);

router.get("/user/:id", auth, userController.getUser);

router.patch("/user", auth, userController.updateUser);

router.patch("/user/:id/follow", auth, userController.follow);

router.patch("/user/:id/unfollow", auth, userController.unfollow);

router.get("/suggestionsUser", auth, userController.suggestionsUser);

// old routes
router.get("/info", auth, userController.getUserInfo);

router.delete("/delete_account", auth, userController.deleteAccount);

router.patch("/update", auth, userController.updateUser2);

// Admin only routes
router.get("/admin/all_info", auth, authAdmin, userController.getAllUsersInfo);

router.patch(
  "/admin/update_role/:id",
  auth,
  authAdmin,
  userController.updateUsersRole
);

router.delete("/admin/delete/:id", auth, authAdmin, userController.deleteUser);

module.exports = router;
