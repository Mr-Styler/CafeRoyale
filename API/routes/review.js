const reviewController = require("./../controllers/review");
const router = require("express").Router({ mergeParams: true });

router.route('/').get(reviewController.getAllReview).post(reviewController.createReview);
router.route('/:id').get(reviewController.getReview).patch(reviewController.updateReview).delete(reviewController.deleteReview);

module.exports = router;