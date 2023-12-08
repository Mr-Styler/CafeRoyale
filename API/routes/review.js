const reviewController = require("./../controllers/review");
const router = require("express").Router({ mergeParams: true });

router.route('/').get(reviewController.getAllReview).post((req, res, next) => {
    if (!req.body.userId) {
        req.body.userId = req.session.user._id
    }

    console.log(req.body)

    next();
},reviewController.createReview);
router.route('/:id').get(reviewController.getReview).patch(reviewController.updateReview).delete(reviewController.deleteReview);

module.exports = router;