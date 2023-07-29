const blogController = require("./../controllers/blog");
const authController = require("./../controllers/auth");
const reviewRoute = require("./review");
const router = require("express").Router();

router.get("/", blogController.getAllBlog);
router.get("/:id", blogController.getBlog);

router.use(authController.isAuth);
router.use("/:blogId/reviews", reviewRoute);

router.use(authController.restrictTo(["admin"]));
router.post("/", blogController.createBlog);
router
  .route("/:id")
  .patch(blogController.updateBlog)
  .delete(blogController.deleteBlog);

module.exports = router;
