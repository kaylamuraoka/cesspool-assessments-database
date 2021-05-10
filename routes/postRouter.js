const router = require("express").Router();
const postController = require("../controllers/postController");
const auth = require("../middleware/auth");

router
  .route("/posts")
  .post(auth, postController.createPost)
  .get(auth, postController.getPosts);

router
  .route("/post/:id")
  .patch(auth, postController.updatePost)
  .get(auth, postController.getPost)
  .delete(auth, postController.deletePost);

router.patch("/post/:id/like", auth, postController.likePost);

router.patch("/post/:id/unlike", auth, postController.unlikePost);

router.get("/user_posts/:id", auth, postController.getUserPosts);

router.get("/post_discover", auth, postController.getPostsDiscover);

router.patch("/savePost/:id", auth, postController.savePost);

router.patch("/unsavePost/:id", auth, postController.unsavePost);

router.get("/getSavePosts", auth, postController.getSavePosts);

router.get("/getAllPosts", auth, postController.getAllPosts);

module.exports = router;
